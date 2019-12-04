'user strict'
const connection = require('../../config/database.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const fs = require('fs')
const dotenv = require('dotenv')
dotenv.config()

//Auth object constructor
var Auth = function (user) {
    this.email = user.email
    this.password = user.password
}

Auth.getToken = (newUser, callback, next) => {
    var arrResult = [];
    connection.query("SELECT a.id, a.email, a.kode_trader, a.password, b.show_aju, b.tipe_dokumen, b.fasilitas_perusahaan FROM tm_user a INNER JOIN tm_perusahaan b on b.kode_trader = a.kode_trader WHERE a.email = ? ", newUser.email, (err, res) => {
        if (err) {
            next(err);
        } else {
            if (res.length > 0) {
                if (bcrypt.compareSync(newUser.password, res[0].password)) {
                    //isi jwt
                    var payload = {
                        username: res[0].id,
                        company: res[0].kode_trader,
                        email: res[0].email,
                        show_aju: res[0].show_aju,
                        tipe_dokumen: res[0].tipe_dokumen,
                        fasilitas_perusahaan: res[0].fasilitas_perusahaan
                    }

                    //private and public key
                    var privateKey = fs.readFileSync(process.env.PRIVATE_KEY, 'utf8')

                    //sign option
                    var signOptions = {
                        audience: process.env.SECRET_TOKEN,
                        expiresIn: process.env.EXPIRED_TOKEN,
                        algorithm: process.env.ALGORITHM
                    }
                    const token = jwt.sign(payload, privateKey, signOptions)
                    arrResult = [{ token: token }]
                }
            }
            callback(arrResult);
        }
    });
}

module.exports = Auth