require('express-async-errors');
const express = require('express')
const app = express()
app.set("view engine", "ejs");

require('./startup/logging')
require('./startup/db')();
require('./startup/router')(app);
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);



const port = process.env.PORT || 3000

const server = app.listen(port, () => {
    console.log('Server starts in localhost:' + port)
});

module.exports = server

