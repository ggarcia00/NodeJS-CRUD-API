const Sequelize = require('sequelize')

const sequelize = new Sequelize('githubDB', 'root', '12345', {
    host: 'localhost',
    dialect: 'mysql'
})



module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}