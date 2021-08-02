const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token')
    if (token) {
        const key = config.get('jwtPrivateKey')
        try {
            const decoded = jwt.verify(token, key)
            req.user = decoded
            next()
        } catch (error) {
            res.status(400).send('Invalid Token!')
        }
       
        
    } else {
        res.status(401).send('Access denied . Token not provided!')
    }
}