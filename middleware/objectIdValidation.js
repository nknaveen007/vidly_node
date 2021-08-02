const mongoose = require('mongoose')

module.exports = (req, res, next) => {
    const valid = mongoose.Types.ObjectId.isValid(req.params.id)
        if (valid) {
            next()
        } else {
            res.status(404).send('invalid ID') 
        }
       
    
}