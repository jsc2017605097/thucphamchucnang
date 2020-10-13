const route = require('express').Router()
const model_product = require('../model/product')
const fs = require('fs')

route.post('/',require('../middleware/check_token'), async (req, res) => {
    const product_saved = await (new model_product(req.body)).save()
    return res.status(200).json(product_saved)
})

route.get('/', async (req, res) => {
    const products = await model_product.find({})
    return res.status(200).json(products)
})

route.put('/:id',require('../middleware/check_token'), async (req, res, next) => {
    const updatedProduct = await model_product.findByIdAndUpdate(req.params.id,
        { ...req.body},
        { new: true })
    res.status(200).json(updatedProduct)
})

route.delete('/:id', require('../middleware/check_token'), async (req, res) => {
    const deletedProduct = await model_product.findByIdAndRemove(req.params.id)
    deletedProduct.img.forEach(img => {
        fs.unlink('./build' + img, () => console.log('deleted image'))
    })
    res.status(200).json(deletedProduct)
})

module.exports = route