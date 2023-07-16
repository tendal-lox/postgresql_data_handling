const router = require('express').Router()
const {axiosRequestFunction} = require('../services/controllerFunction')

router.get('/', axiosRequestFunction)

module.exports = router