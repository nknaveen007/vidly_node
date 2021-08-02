const express = require('express')
const error = require('../middleware/error')
const genres = require('../routes/genres')
const home = require('../routes/home')
const customer = require('../routes/customer')
const movies = require('../routes/movies')
const rentals = require('../routes/rentals')
const users = require('../routes/users')
const auth = require('../routes/auth')
const image = require('../routes/image')


module.exports = (app) => {
app.use(express.json());   
app.use('/',home)
app.use('/api/users', users)
app.use('/api/auth', auth)
app.use('/api/genres', genres)
app.use('/api/customer',customer)
app.use('/api/movies', movies)
app.use('/api/rentals', rentals)
app.use('/api/image',image)    
app.use(error)
}

