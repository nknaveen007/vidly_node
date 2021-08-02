const { createLogger, transports, format } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;
require('winston-mongodb')


  const db= 'mongodb+srv://dbNaveen:nksniper007@cluster0.twfi3.mongodb.net/exercise?retryWrites=true&w=majority'
  const options= { useNewUrlParser: true, useUnifiedTopology: true }


const logger = createLogger({
    format: format.combine(
        format.json(),
        timestamp(),
        prettyPrint(),
      ),
        transports: [
            new transports.File({ filename: 'log/combined.log' }),
            new transports.MongoDB({ db: db, options: options, collection: 'log' }),
            new transports.Console(),
            
    ],
        exceptionHandlers: [
            new transports.File({ filename: 'log/exceptions.log' }),
            new transports.MongoDB({ db: db, options: options, collection: 'exception' }),
            new transports.Console(),
    ],
        rejectionHandlers: [
            new transports.File({ filename: 'log/rejections.log' }),
            new transports.MongoDB({ db: db, options: options, collection: 'rejection' }),
            new transports.Console(),
      ]
        
      });
       
   
module.exports = logger