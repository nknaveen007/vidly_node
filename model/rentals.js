const mongoose = require('mongoose')
const Joi = require('joi')

const Rentals = mongoose.model('Rentals', new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength:150
            },
            isGold: {
                type: Boolean,
                default:false
            },
            phone: {
                type: String,
                required: true,
                minlength: 10,
                maxlength:10
            }
        })
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required:true
            },
            dailyRentalRate: { 
                type: Number, 
                required: true,
                min: 0,
                max: 255
              }
            
        })
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date,
    },
    rentalFee: {
        type: Number,
        min:0
    }
}))


const validation = (value) => {
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId:Joi.objectId().required()
    })
    return schema.validate(value)
}


exports.validation = validation
exports.Rentals = Rentals