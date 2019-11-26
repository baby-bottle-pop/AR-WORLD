const router = require('express').Router()
const { User, Reviews } = require('../db/models')

router.get('/', async (req, res, next) => {
    try {
        console.log('testing the user route')
    } catch (error) {
        next(error)
    }
})

module.exports = router