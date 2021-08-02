const Joi = require('joi')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    caption: {
        required: true,
        type: String,
    },
    filename: {
        required: true,
        type: String,
    },
   
    createdAt: {
        default: Date.now(),
        type: Date,
    },
});


const Images = mongoose.model('Images', ImageSchema);

const validation = (value) => {
    const schema = Joi.object({
        caption: Joi.string().required(),
        filename: Joi.string().required(),

        
    })
    return schema.validate(value)
}

module.exports.Images = Images;
module.exports.validation = validation;