const express = require('express')
const app = express()
const Joi = require('joi')

const genresList = [
    { id: 1, genres: 'action' },
    { id: 2, genres: 'adventure' },
    { id: 3, genres: 'romance' }
]

const validation = (value) => {
    const schema = Joi.object({
        genres: Joi.string().min(3).max(30).required(),
    })
   return schema.validate(value)
    
}

app.use(express.json());


app.get('/api/genres', (req, res) => {
    res.send(genresList)
})

app.get('/api/genres/:id', (req, res) => {
    console.log(req.params.id)
    const genres = genresList.find((value) => value.id === parseInt(req.params.id))
    if (genres) {
        res.send(genres)
    } else {
        res.status(404).send('genres not found')
    }
})

app.post('/api/genres', (req, res) => {
    const { error } = validation(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
    } else {
        const genres = {
            id: genresList.length + 1,
            genres:req.body.genres
        }
        genresList.push(genres)
        res.send(genres)
    }
})


app.put('/api/genres/:id', (req, res)=> {
    const genres = genresList.find((value) => value.id === parseInt(req.params.id))
    if (genres) {
        const { error } = validation(req.body)
        if (error) {
            res.status(400).send(error.details[0].message)
        } else {
            genres.genres = req.body.genres
            res.send(genres)
        }  
    } else {
        res.status(404).send('genres not found')
    }
});



app.delete('/api/genres/:id', (req, res)=> {
    const genres = genresList.find((value) => value.id === parseInt(req.params.id))
    if (genres) {
        const index = genresList.indexOf(genres)
        genresList.splice(index, 1)
        res.send('Genres deleted successfully')
    } else {
        res.status(404).send('genres not found')
    }
});

const port =process.env.PORT || 3000
app.listen(port, () => {
    console.log('Server starts in localhost:'+port)
})

