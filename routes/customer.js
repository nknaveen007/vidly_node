const express = require('express')
const route = express()
const {Customer,validation} = require('../model/customer')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

route.get('/',[auth,admin], async (req, res) => {
        const customer = await Customer.find({i}).sort({name:1})
        res.send(customer)
})


route.get('/:id',auth, async(req, res) => {
    const customer = await Customer.findById(req.params.id)
    if (customer) {
        res.send(customer) 
    } else {
        res.status(400).send('Customer is not exist')
    }
    
})

route.post('/',[auth,admin], async(req, res) => {
    const { error } = validation(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
        
    } else {
        let customer = new Customer({
            name: req.body.name,
            phone: req.body.phone,
            isGold:req.body.isGold
        })
        customer = await customer.save()
        res.send(customer)
    }
})

route.put('/:id',[auth,admin], async(req, res) => {
    const { error } = validation(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
    } else {

        try {
            const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true })
            if (customer) {
                res.send(customer)
            } else {
                res.status(404).send('Customer not exist')
            }
           
        } catch (error) {
            console.log(error)
        }
    }
})

route.delete('/:id',[auth,admin], async(req, res) => {
    try {
        const customer = await Customer.findByIdAndRemove(req.params.id)
        if (customer) {
            res.send('Customer data removed successfully')
        } else {
            res.status(404).send('Customer not exist')
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = route