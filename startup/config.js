const config = require('config')
const logger = require('../startup/logging')

module.exports = () => {
    if (!config.get('jwtPrivateKey')) {
        logger.log('error : jwtPrivateKey is not defined')
        console.log('error : jwtPrivateKey is not defined')
        process.exit(1)
    }
}
