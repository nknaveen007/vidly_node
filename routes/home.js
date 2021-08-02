const express = require('express')
const route = express()


route.get('/', (req, res) => {
    res.send('hello home')
})

module.exports = route;