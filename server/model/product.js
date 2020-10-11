const mongoose = require('mongoose')

const model_product = new mongoose.Schema({
    name:String,
    description:String,
    detail:String,
    price:Number,
    price_old:Number,
    img:[{type:String}],
    category:{ type: mongoose.Schema.Types.ObjectId, ref: 'category' },
    created_at:{type:Date,default:Date.now}
})

module.exports = mongoose.model('product',model_product)