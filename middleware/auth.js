const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const dotenv = require("dotenv")

dotenv.config()

const validateToken = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({
                message:'Authorization header is required'
            })
        }
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            res.status(401).json({
                message: 'invalid token'
            })
        }

        const payLoad = jwt.verify(token, process.env.JWT_secret_code)
        if (!payLoad) {
            res.status(401).json({
                message:'invalid'
            })
        }

        const user = await User.findByPk(payLoad.id)
        if (!user) {
            res.status(401).json({
                message:'error fetching user'
            })
        }

        req.user = user
        next()

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = validateToken