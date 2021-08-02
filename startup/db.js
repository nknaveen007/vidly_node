const mongoose = require('mongoose')
const config = require('config')

module.exports = async() => {
        const mongoDB = config.get('db')
        const result = await mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify: false,useCreateIndex:true })
        console.log(`MongoDb was connected to ${mongoDB}`)

        
}


