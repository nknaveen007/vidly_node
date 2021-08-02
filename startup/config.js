const config = require('config')

module.exports = () => {
    if (!config.get('jwtPrivateKey')) {
        console.log('error : jwtPrivateKey is not defined')
        process.exit(1)
    }
}
