const express = require('express')
const route = express()
const { Movies, validation } = require('../model/movies')
const { Genre } = require('../model/genres')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

route.get('/',auth, async(req, res) => {
    const movies = await Movies.find()
    res.send(movies)
})

route.get('/:id',auth, async (req, res) => {

    const movies = await Movies.findById(req.params.id)
    if (movies) {
     res.send(movies)  
    } else {
        res.status(400).send({
            value:'id not found'
        })
    }
    
})

route.post('/',[auth,admin], async (req, res) => {
    const { error } = validation(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
    } else {
        const genre = await Genre.findById(req.body.genreId)
        if (genre) {
            const movies = new Movies({
                title: req.body.title,
                genre: {
                    _id: genre._id,
                    genre: genre.genre
                },
                numberInStock: req.body.numberInStock,
                dailyRentalRate: req.body.dailyRentalRate
            })
            
            await movies.save()
            res.send(movies)
        } else {
            res.status(404).send('genre id not found')
        }
    }
    
})

route.put('/:id',[auth,admin], async (req, res) => {
    const { error } = validation(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
    } else {
        const genre = await Genre.findById(req.body.genreId)
        if (genre) {
            const movies = await Movies.findByIdAndUpdate(req.params.id, {
                title: req.body.title,
                genre: {
                    _id: genre._id,
                    genre: genre.genre
                },
                numberInStock: req.body.numberInStock,
                dailyRentalRate: req.body.dailyRentalRate
            },{new:true})
            res.send(movies)
        } else {
            res.status(404).send('genre id not found')
        }
    }
    
})

route.delete('/:id',[auth,admin], async (req,res) => {
    
        const movies = await Movies.findByIdAndDelete(req.params.id)
        if (movies) {
            res.send('deleted successfully')
        } else {
            res.status(404).send('given id is not found')
        }
    
})


module.exports = route















