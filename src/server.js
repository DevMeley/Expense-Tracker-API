const app = require('./app')
const dotenv = require("dotenv")
dotenv.config()

const PORT = process.env.PORT || 2000

app.listen(PORT, () =>{
    console.log(`Server is running on Port ${PORT}`)
})