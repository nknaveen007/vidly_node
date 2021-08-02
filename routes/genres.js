const validId = require('../middleware/objectIdValidation')
const asyncMiddleware = require('../middleware/async')
const express = require('express')
const route = express()
const { Genre, validation } = require('../model/genres')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')



route.get('/',asyncMiddleware(async(req, res) => {
    const genre = await Genre.find({})
    res.send(genre)
}))

route.get('/:id',validId, async (req, res) => {

    const genre = await Genre.findById(req.params.id)
    if (genre) {
        res.send(genre)
    } else {
        res.status(404).send('genres not found')
    }
})

route.post('/',auth, async (req, res) => {
    const { error } = validation(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
    } else {
        let genre = new Genre({
            genre:req.body.genre
        })
        genre= await genre.save()
        res.send(genre)
    }
})


route.put('/:id',auth, async(req, res)=> {
    
        const { error } = validation(req.body)
        if (error) {
            res.status(400).send(error.details[0].message)
        } else {
            const genre = await Genre.findByIdAndUpdate(req.params.id, { genre: req.body.genre }, { new: true })
            if (genre) {
            res.send(genre)
            } else {
                res.status(400).send('Genre is not found')   
            }
            
      
        }  
   
});



route.delete('/:id',[auth,admin], async(req, res)=> {
    const genre = await Genre.findByIdAndDelete(req.params.id)
    if (genre) {
        res.send('Genres deleted successfully')
    } else {
        res.status(404).send('genres not found')
    }
});

module.exports = route