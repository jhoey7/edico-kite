'use strict'
const jwt = require('jsonwebtoken')
const fs = require('fs')
const dotenv = require('dotenv')
dotenv.config()

function verifyToken(req, res, next) {
    let token = "";
    if (req.header('Authorization')) {
        token = req.header('Authorization').replace('Bearer ', '')
    }

    if (!token) {
        return res.status(422).send({ response: { status: false, message: "Authorization Token field is required." } })
    } else {
        if (req.headers['content-type'] != "application/json") {
            return res.status(415).send({ response: { status: false, message: "Please use 'Content-Type: application/json' as your http headers" } });
        } else {
            //private and public key
            var publicKey = fs.readFileSync(process.env.PUBLIC_KEY, 'utf8')

            //sign option
            var verifyOptions = {
                audience: process.env.SECRET_TOKEN,
                expiresIn: process.env.EXPIRED_TOKEN,
                algorithm: [process.env.ALGORITHM]
            }
            jwt.verify(token, publicKey, verifyOptions, (err, decoded) => {
                if (err) {
                    return res.status(401).send({ response: { status: false, message: err } })
                } else {
                    req.user = decoded
                    next()
                }
            })
        }
    }
}

module.exports = verifyToken