const mongoose = require('mongoose')
const Joi = require('joi')

const genreSchema = new mongoose.Schema({
    genre: {type:String,required:true,minLength:3,maxLength:30}
})

const Genre = mongoose.model('Genre', genreSchema);

const validation = (value) => {

    const schema = Joi.object({
        genre: Joi.string().min(3).max(30).required(),
    })
   return schema.validate(value)
    
}

exports.genreSchema = genreSchema
exports.Genre = Genre
exports.validation = validation

