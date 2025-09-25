const bcrypt = require('bcrypt')
const User  = require('../../models/user')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()




// describe create user
// route POST v1/user
// Access public
const createUserHandler = async (req, res) => {
    try {
        let {name, email, password} = req.body
        if (typeof name !== 'string') {
           return res.status(400).json({
            message: 'name must be a string'
           })
        }
    
        if ( typeof email !== 'string') {
            return res.status(400).json({
                message: 'email must be a string'
            })
        }

        if (typeof password !== 'string') {
            return res.status(400).json({
                message: 'password must be a string'
            })
        }

        if (password < 8) {
            res.status(400).json({
                message: 'Password is less than 8'
            })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        
console.log('Request body:', req.body);
console.log('Creating user...');
        const user = await User.create({
            name,
            email,
            password: hashPassword
        })

        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email
        })

    } catch (error) {
        return res.status(500).json({
        message: error.message
        })
    }
}


// describe retrieve/find user
// route GET v1/user/:id
// Access public
const getUserHandler = async (req, res) => {
    try {
        const {id} = req.params
        if ( typeof id !== 'string') {
            return res.status(400).json({
                message: 'invalid id'
            })
        }

        const user = await User.findByPk(id)
        if (!user) {
            return res.status(404).json({
                message: 'user not found'
            })
        }

        return res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
            
        })
    }
    
}


// describe Login user
// route GET v1/user/login
// Access public
const loginUSerHandler = async (req, res) => {
    try {
        const {email, password} = req.body

        const user = await User.findOne({where: {email}})
        if (!user) {
            return res.status(201).json({
                message:'Invalid email'
            })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(201).json({
                message:'Invalid password'
            })
        }

        const payLoad = {
            id: user.id,
            email: user.email
        }

        const token = jwt.sign(payLoad, process.env.JWT_secret_code, {expiresIn: '7d'})
        return res.status(200).json({
            token
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


module.exports = {
    createUserHandler,
    getUserHandler,
    loginUSerHandler,
}