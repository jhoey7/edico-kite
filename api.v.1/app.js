const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

// handle errors
app.use(function (err, req, res, next) {
    if (err.status === 404)
        res.status(404).json({ response: { status: false, message: "Request URL Not Found." } });
    else
        res.status(500).json({ response: { status: false, message: "Internal Server Error." } });
});

module.exports = app