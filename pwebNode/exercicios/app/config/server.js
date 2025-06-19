let express = require('express');
let consign = require('consign');
let app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

consign({cwd:'app'})
    .include('routes')
    .then('models')
    .then('config/dbConnection.js')
    .into(app);

module.exports = app;