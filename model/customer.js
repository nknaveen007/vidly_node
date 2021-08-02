const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: { type: String,required:true,minLength:3,maxLength:50 },
    phone: { type: String,required:true,minLength:10,maxLength:10 },
    isGold: { type: Boolean, default:false }
}));


const validation = (value) => {
    
    const Schema = Joi.object({
      name: Joi.string().min(3).max(50).required(),
      phone: Joi.string().min(10).max(10).required(),
      isGold: Joi.boolean()
    });

    return Schema.validate(value)
    
}

exports.Customer = Customer;
exports.validation = validation;