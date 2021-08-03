const express = require('express')
const route = express()
const { Rentals, validation } = require('../model/rentals')
const { Movies } = require('../model/movies')
const { Customer } = require('../model/customer')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')


route.get('/',[auth,admin], async(req, res) => {
    const rentals = await Rentals.find()
    res.send(rentals)
})


route.post('/',auth, async (req, res) => {
    const { error } = validation(req.body);
        
    if (error) {
        res.status(400).send(error.details[0].message)
    } else {
        const customer = await Customer.findById(req.body.customerId);
    if (customer) {
        const movie = await Movies.findById(req.body.movieId);
        
        if (movie) {
            if (movie.numberInStock !==0) {
                let rentals = new Rentals({
                    customer: {
                        _id: customer._id,
                        name: customer.name,
                        phone:customer.phone
                    },
                    movie: {
                        _id:movie._id,
                        title: movie.title,
                        dailyRentalRate:movie.dailyRentalRate
                    },
                })
                
                rentals = await rentals.save()

                movie.numberInStock--;
                movie.save();

                res.send(rentals)
            } else {
                res.status(400).send('Number in stock is 0')
            }
        } else {
            res.status(404).send('Movie Id not found')
        }
    } else {
        res.status(404).send('Customer Id not found')
    }   
    }

})

module.exports = route