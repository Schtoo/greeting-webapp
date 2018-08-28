"use strict"

const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const greetings = require('./greetingsFactory.js');
const flash = require('express-flash');
const session = require('express-session');
let greetingsInstance = greetings();

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(session({
    secret : "<add a secret string here>",
    resave: false,
    saveUninitialized: true
  }));

  app.use(flash());

app.get('/', function (req, res) {
    res.render('home')
})

app.post('/greetings', function (req, res) {
    let name = req.body.names;
    let lang = req.body.language;

    let greeter = {
        greet: greetingsInstance.greeting(name, lang),
        count: greetingsInstance.counter()
    }

    if (name === "" || name === undefined){
        req.flash('info',  'Please enter a name')
    } else if (lang === undefined){
        req.flash('info', 'Please select language')
    } else {
        greetingsInstance.greeting(name, lang);
    }
    
    res.render('home', {
        greeter
    });
});

app.post('/', function () {
    res.render('home', function () {

    });
});

app.get('/', function (req, res) {
    res.render('home')
})

let PORT = process.env.PORT || 3015;

app.listen(PORT, function () {
    console.log('App successfully starting on port', PORT);
});
