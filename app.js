// app.js

const express = require('express');
const bodyParser = require('body-parser');

const product = require('./routes/product.route'); // Imports routes for the products
const app = express();

// Set up mongoose connection
const mongoose = require('mongoose');
//let dev_db_url = 'mongodb://52.167.5.214:27017/productstutorial';

let dev_db_url = 'mongodb://127.0.0.1:27017/productstutorial';
//'mongodb://someuser:abcd1234@ds123619.mlab.com:23619/productstutorial' myapp;
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/products', product);

let port = 3000;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});