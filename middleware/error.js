const logger = require('../startup/logging');
module.exports = (err, req, res, next) => {
    logger.error(err.message,err)
    res.status(500).send('something wrong')
    
}