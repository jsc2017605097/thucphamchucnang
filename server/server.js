const express = require('express')
const app = express()
const fileUpload = require('express-fileupload')
const path = require('path')
const fs = require('fs')

require('express-async-errors')
require('dotenv').config()

const cors = require('cors')

app.use(fileUpload())
app.use(express.json())
app.use(cors())

const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => console.log("Connect MongoDb successly!"))

const route_user = require('./controller/user')
const model_product = require('./model/product')

// ---------- TOI UU WEBSITE -----------
app.get('/', function (request, response) {
    const filePath = path.resolve(__dirname, './build', 'index.html');

    // read in the index.html file
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }

        // replace the special strings with server generated strings
        data = data.replace(/\$OG_TITLE/g, 'Thực phẩm chức năng');
        data = data.replace(/\$OG_DESCRIPTION/g, "Thực phẩm chức năng chính hãng, đông trùng hạ thảo...");
        data = data.replace(/\$OG_KEYWORD/g, "thucphamchucnang, thực phẩm chức năng, thuc pham chuc nang, dong trung ha thao")
        result = data.replace(/\$OG_IMAGE/g, path.join('./images', "display.JPG"));
        response.send(result);
    });
});

app.get('/product/:id', async function (req, response) {
    const product = await model_product.findById(req.params.id)
    const filePath = path.resolve(__dirname, './build', 'index.html');
    // read in the index.html file
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }

        // replace the special strings with server generated strings
        data = data.replace(/\$OG_TITLE/g, product.name);
        data = data.replace(/\$OG_DESCRIPTION/g, product.description);
        data = data.replace(/\$OG_KEYWORD/g, product.name)
        result = data.replace(/\$OG_IMAGE/g, product.img[0]);
        response.send(result);
    });
});
//-----------------


app.post('/api/uploads', require('./middleware/check_token'), require('./controller/upload'))
app.use('/api/product', require('./controller/product'))
app.use('/api/category', require('./controller/category'))
app.use('/api/user', require('./middleware/check_token'), route_user)
app.post('/api/login', require('./controller/login'))
app.use(require('./middleware/error'))
app.post('/api/checktoken', require('./middleware/check_token'), (req, res) => {
    res.status(200).json({ user: req.decode_token.name })
})
app.post('/api/deleteimage', (req, res) => {
    req.body.img.forEach(img => {
        fs.unlink('./build' + img, () => {
            console.log("deleted img!")
        })
    })

    res.status(200).json({ link: req.body.link })
})
app.post('/upload', (req, res) => {
    const { upload } = req.files
    upload.mv(path.join(__dirname, 'build', 'images', upload.name))
    res.status(200).json({
        uploaded: true,
        url: '/images/' + upload.name,
        name: upload.name
    })
})
app.post('/api/email',require('./controller/email'))
app.use(express.static('build'))
app.use('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log("Server started with " + PORT))