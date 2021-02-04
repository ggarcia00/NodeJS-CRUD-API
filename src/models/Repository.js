const db = require('./db')

const Repository = db.sequelize.define('repositories', {
    nome: {
        type: db.Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    description: {
        type:db.Sequelize.TEXT
    },
    public: {
        type: db.Sequelize.BOOLEAN,
        allowNull: false
    },
    user_id: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'users',
            key: 'id'
        },
        onDelete: 'cascade'
        
    },
    slug: {
        type:db.Sequelize.STRING,
        allowNull: false,
        unique: true
    }  
}, {
    freezeTableNames: true,
    timestamps :false
})

Repository.sync()
module.exports = Repository