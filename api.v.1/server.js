const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const appRoutes = require('./app/routes/appRoutes');
const response = require('./config/response.js')
const dotenv = require('dotenv');
dotenv.config();

port = process.env.PORT
app.listen(port, () => console.log(`Listeining on port ${port}...`));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', appRoutes);

// handle errors 404
app.use(function (req, res, next) {
    response.urlNotFound(res)
});

app.use(function (err, req, res, next) {
    console.log(err)
    response.fatalError(res)
});

module.exports = app