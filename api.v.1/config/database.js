'use strict'
const mysql = require("mysql")
const dotenv = require('dotenv')
dotenv.config()

//Database connection
const db = mysql.createConnection({
	host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_NAME
})
db.connect(function (err) {
	if (err) {
		console.log("Database Not Connected")
	}
})

module.exports = db