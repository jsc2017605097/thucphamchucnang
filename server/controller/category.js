const model_category = require('../model/category')
const route = require('express').Router()

route.post('/', async (req, res, next) => {
    const category = {
        name: req.body.name
    }

    const category_saved = await (new model_category(category)).save()
    return res.status(200).json(category_saved)
})

module.exports = route