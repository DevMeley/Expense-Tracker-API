const {Sequelize} = require('sequelize')


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect:'postgres',
})

(async () => {
    try {
        await sequelize.authenticte()
        console.log('Connection established')
    } catch (error)
    {
        console.log('Unable to connect to database', error)
    }
}
)()

module.exports = sequelize