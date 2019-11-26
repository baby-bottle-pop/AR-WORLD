const router = require('express').Router()
const { User, Reviews } = require('../db/models')

router.get('/', async (req, res, next) => {
    try {
        // const allReviews = await Reviews.findAll()
        console.log('testing')
        // res.json(allReviews)
    } catch (error) {
        next(error)
    }
})

module.exports = router