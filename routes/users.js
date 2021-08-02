const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const express = require('express')
const _ = require('lodash')
const bcrypt = require('bcrypt');
const route = express()
const {Users,validation} = require('../model/users')

route.get('/',[auth,admin], async(req, res) => {
    const users = await Users.find().select('-password')
    res.send(users)
})

route.get('/me',auth, async(req, res) => {
    const users = await Users.findById(req.user._id).select('-password')
    res.send(users)
})

route.post('/',async (req, res) => {
    const { error } = validation(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
    } else {
        let users = new Users(_.pick(req.body,['name','email','password']))
        try {
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(users.password, salt)
            users.password = hash    
            users = await users.save()

            const token = users.generateAuthToken()
        
            res.header('x-auth-token',token).send(_.pick(users,['_id','name','email']))
        } catch (error) {
            res.status(400).send('email already taken')
        }
    }
})



module.exports = route