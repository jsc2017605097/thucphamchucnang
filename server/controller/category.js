const model_category = require('../model/category')
const product = require('../model/product')
const route = require('express').Router()
const model_product = require('../model/product')

route.post('/', async (req, res, next) => {
    const category = {
        name: req.body.name
    }

    const category_saved = await (new model_category(category)).save()
    return res.status(200).json(category_saved)
})

route.get('/', async (req, res) => {
    const category = await model_category.find({})
    return res.status(200).json(category)
})

route.delete('/:id', async (req, res) => {
    const category_deleted = await model_category.findByIdAndRemove(req.params.id)
    const p = await model_product.find({ category: category_deleted._id }).remove()

    return res.status(200).json(category_deleted)
})

module.exports = route