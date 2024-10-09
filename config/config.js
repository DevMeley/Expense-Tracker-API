let dotenv = require("dotenv")
dotenv.config()

config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: 5432,
    dialect: "postgres"
  },
  jwtSecret: process.env.JWT_secret_code,
}

module.exports = config

