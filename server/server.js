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

app.post('/api/uploads',require('./middleware/check_token'), require('./controller/upload'))
app.use('/api/product', require('./controller/product'))
app.use('/api/category', require('./controller/category'))
app.use('/api/user',require('./middleware/check_token'), route_user)
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

app.use(express.static('build'))
app.use('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log("Server started with " + PORT))