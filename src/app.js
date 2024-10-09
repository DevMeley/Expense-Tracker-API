const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const sharedRouter = require('../Routes/v1/sharedRoutes')


// load the environmental variable from the env files
dotenv.config()

const app = express()


// middleware
app.use(express.json())
// app.use(cors(corsOptions))

// routes
app.use('/v1/shared', sharedRouter)


module.exports = app