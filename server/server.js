const express = require('express')
const app = express()

require('express-async-errors')
require('dotenv').config()

app.use(express.json())

const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => console.log("Connect MongoDb successly!"))

const route_user = require('./controller/user')

app.use('/api/user', route_user)
app.post('/api/login', require('./controller/login'))
app.use(require('./middleware/error'))
app.post('/api/checktoken', require('./middleware/check_token'), (req, res) => {
    res.status(200).json({ user: req.decode_token.name })
})
const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log("Server started with " + PORT))