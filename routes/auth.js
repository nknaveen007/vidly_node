const express = require('express')
const Joi = require('joi')
const bcrypt = require('bcrypt');
const route = express()
const {Users} = require('../model/users')



route.post('/',async (req, res) => {
    const { error } = validation(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
    } else {
        const user = await Users.findOne({email:req.body.email})
        if (user) {
            try {
               const isValidPassword = await bcrypt.compare(req.body.password,user.password)
                if (isValidPassword) {
                    const token = user.generateAuthToken()
                    res.send({
                        user: true,
                        token:token
                   })
                } else {
                   res.status(400).send('Invalid Password!') 
               }
            } catch (error) {
                console.error(error)
            }
        } else {
            res.status(400).send('Invalid email')
        }
    }
})


    const validation = (value) => {
        const schema = Joi.object({
            email: Joi.string().required().min(5).max(250).email(),
            password:Joi.string().required().min(5).max(250)
        })
    
        return schema.validate(value)
    }


module.exports = route