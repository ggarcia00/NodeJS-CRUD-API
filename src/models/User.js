const db = require('./db')

const User = db.sequelize.define('users', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: db.Sequelize.STRING,
        allowNull: false,
        unique:true
    },
    localizacao: {
        type: db.Sequelize.STRING
    },
    avatar: {
        type: db.Sequelize.STRING
    },
    username: {
        type: db.Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    bio: {
        type: db.Sequelize.TEXT,
    }
}, {
    freezeTableName: true,
    timestamps: false
})

User.sync()
module.exports = User
