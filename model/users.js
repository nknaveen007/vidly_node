const jwt = require('jsonwebtoken')
const config = require('config')
const mongoose = require('mongoose')
const Joi = require('joi')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength:150
    },
    email: {
        type:String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength:250
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength:2000
    },
    isAdmin:Boolean
})

userSchema.methods.generateAuthToken = function () {
    const key = config.get('jwtPrivateKey');
    const token = jwt.sign({ _id: this._id ,isAdmin:this.isAdmin }, key)
    return token
}

const Users = mongoose.model('Users', userSchema )

const validation = (value) => {
    const schema = Joi.object({
        name: Joi.string().required().min(5).max(150),
        email: Joi.string().required().min(5).max(250).email(),
        password:Joi.string().required().min(5).max(250)
    })

    return schema.validate(value)
}



exports.Users = Users
exports.validation = validation

