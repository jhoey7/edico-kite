'use strict'
const authModel = require('../models/authModel')
const response = require('../../config/response.js')

exports.auth = function (req, res, next) {
	try {
		var user_credectial = new authModel(req.body)
		authModel.getToken(user_credectial, function (token) {
			if (token.length > 0) {
				response.ok(token, "success", res)
			} else {
				response.badRequest(res)
			}
		}, function (error) {
			next(error)
		})
	} catch (error) {
		next(error)
	}
}