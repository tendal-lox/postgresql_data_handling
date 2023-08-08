const express = require('express')
const app = express()
require('dotenv').config()
const router = require('./controller/routes')
const EventEmitter = require('events')
const event = new EventEmitter()
const {DB_Setup} = require('./services/dataBase')
DB_Setup()

app.use(router)


event.on('web_server_start', () => {
    app.listen(process.env.PORT)
    console.log('Web server is ready')
})
event.on('error', () => {
    console.log('error')
})

event.emit('web_server_start')