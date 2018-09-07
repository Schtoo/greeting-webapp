"use strict"

const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const greetings = require('./greetingsFactory.js');
const flash = require('express-flash');
const session = require('express-session');

const pg = require("pg");
const Pool = pg.Pool;

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local){
    useSSL = true;
}
// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgres://coder:pg123@localhost:5432/greeted_users';

const pool = new Pool({
    connectionString,
    ssl : useSSL
  });

// creating instance of factory function
let greetingsInstance = greetings(pool);

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

app.get('/', async function (req, res) {
    let greeter = {
        counta: await greetingsInstance.counter()
    }
    res.render('home',{
        greeter
    });
});

app.post('/greetings', async function (req, res) {
    let name = req.body.names;
    let lang = req.body.language;

    let greeter = {
        greet: await greetingsInstance.greeting(name, lang),
        counta: await greetingsInstance.counter()
    }
    if (name === "" || name === undefined){
        
        req.flash('info',  'Please enter a name')
    } else if (lang === undefined){
        req.flash('info', 'Please select language')
     }
     
    res.render('home', {
        greeter
    });
});

app.post('/reset', async function (req, res){
    let resetBtn = await greetingsInstance.resetBttn();
    res.redirect('/');
});

app.post('/greeted', async function (req, res) {
    let users = await greetingsInstance.user();
    res.render('users', {
        users
    });
});

app.post('/', async function (req, res){
    res.redirect('/', {
    });
});
app.post('/clear', async function (req, res){
    let reset = await pool.query('DELETE FROM users');
    res.render('users');
});

let PORT = process.env.PORT || 3010;

app.listen(PORT, function () {
    console.log('App successfully starting on port', PORT);
});