const router = require('express').Router()
const { axiosRequestFunction, getAllUsersFunction } = require('../services/controllerFunction')

router.get('/', axiosRequestFunction)

router.get('/members', getAllUsersFunction)

module.exports = router
