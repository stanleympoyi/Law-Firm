const express = require("express");
const app = express()
const path = require('path');
const ejsMate = require('ejs-mate');
const mysql= require('mysql');

require('dotenv').config();

const port = process.env.PORT || 1959;
// const bodyParser = require('body-parser');

// Parsing middleware 
//Parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.urlencoded({extended: true}));


// Parse appliction/json
app.use(express.json());


// Static Files
app.use(express.static(path.join(__dirname, 'public')))

// Templating Engines
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

//Connection Pool
const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME
});

// Connect to DB
pool.getConnection((err, connection) => {
    if(err) throw err; // not connected
    console.log('Connected as ID ' + connection.threadId);
});

const home = require('./server/routes/home')
app.use('/', home);





app.listen(port, () => {
    console.log(`listening on Port ${port} .....`)
});