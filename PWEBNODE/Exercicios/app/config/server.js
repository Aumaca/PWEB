let express = require('express')
let consign  = require('consign')
let bodyParser = require('body-parser')
let app=express();


app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(bodyParser.urlencoded({extended: true}));

consign({'cwd':'app'})
.include('routes')
.then('config/dbConnection.js')
.then('models').into(app); //carrega as rotas e depois o banco automaticamente (verificar em routes)
module.exports = app;

