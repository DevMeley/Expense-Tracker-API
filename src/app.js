const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sharedRouter = require("../Routes/v1/sharedRoutes");
const userRouter = require("../Routes/v1/userRoutes");
const OauthRouter = require("../Routes/v1/OauthRoute")
const categoryRouter = require("../Routes/v1/categoryRoutes");
const expenseRouter = require("../Routes/v1/expenseRoutes");
const budgetRouter = require("../Routes/v1/budgetRoute");
const NotificationRouter = require("../Routes/v1/notificationRoute");

// load the environmental variable from the env files
dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "100.20.92.101",
      "44.225.181.72",
      "44.227.217.144",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// routes
app.use("/v1/shared", sharedRouter);
app.use("/v1/user", userRouter);
app.use("/v1/Oauth", OauthRouter)
app.use("/v1/categories", categoryRouter);
app.use("/v1/expenses", expenseRouter);
app.use("/v1/budgetlimit", budgetRouter);
app.use("/v1/notification", NotificationRouter);

module.exports = app;
