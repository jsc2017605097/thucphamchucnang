const model_category = require('../model/category')
const route = require('express').Router()

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
    return res.status(200).json(category_deleted)
})

module.exports = route