const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const sharedRouter = require('../Routes/v1/sharedRoutes')
const userRouter = require('../Routes/v1/userRoutes')
const categoryRouter = require('../Routes/v1/categoryRoutes')
const expenseRouter = require('../Routes/v1/expenseRoutes')
const budgetRouter = require('../Routes/v1/budgetRoute')
const NotificationRouter = require('../Routes/v1/notificationRoute')

// load the environmental variable from the env files
dotenv.config()

const app = express()


// middleware
app.use(express.json())
// app.use(cors(corsOptions))

// routes
app.use('/v1/shared', sharedRouter)
app.use('/v1/user', userRouter)
app.use('/v1/categories', categoryRouter)
app.use('/v1/expenses', expenseRouter)
app.use('/v1/budgetlimit', budgetRouter)
app.use('/v1/notification', NotificationRouter)



module.exports = app