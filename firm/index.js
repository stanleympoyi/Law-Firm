const express = require("express");
const app = express()
const path = require('path');
const ejsMate = require('ejs-mate')


app.use(express.static(path.join(__dirname, 'public')))

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/clients', (req, res) => {
    res.render('clients')
})

app.get('/cases', (req, res) => {
    res.render('cases')
})

app.get('/courts', (req, res) => {
    res.render('courts')
})

app.get('/judges', (req, res) => {
    res.render('judges')
})

















app.listen(300, () => {
    console.log("listening on Port 300 .....")
})