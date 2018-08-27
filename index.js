"use strict"

const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const greetings = require('./greetingsFactory.js');
let greetingsInstance = greetings();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.render('home')
})

app.post('/greetings', function (req, res) {
    let name = req.body.names;
    let lang = req.body.language;
    let greeter = {
        greet: greetingsInstance.greeting(name, lang)
    }
    res.render('home', function(){
        greeter
    });
});

app.get('/greetings', function(req, res){
    res.render('home', {
        greeting: greetingsInstance.greeting(name. lang)
    });
});

app.post('/', function(){

    res.render('home', function(){

    });
});

app.get('/', function (req, res) {
    res.render('home')
})

let PORT = process.env.PORT || 3015;

app.listen(PORT, function () {
    console.log('App successfully starting on port', PORT);
});
