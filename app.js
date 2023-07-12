const express = require('express')
const app = express()
const axios = require('axios')

app.get('/', async (req, res) => {
    const result = await axios({
        method: 'get',
        url: 'https://jsonplaceholder.typicode.com/users'
    })
    res.send(result.data)
})

app.listen(3000)