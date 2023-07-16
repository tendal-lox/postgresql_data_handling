const express = require('express')
const app = express()
const router = require('./controller/routes')
const EventEmitter = require('events')
const event = new EventEmitter()

app.use(router)


event.on('web_server_start', () => {
    app.listen(3000)
    console.log('Web server is ready')
})
event.on('error', () => {
    console.log('error')
})

event.emit('web_server_start')