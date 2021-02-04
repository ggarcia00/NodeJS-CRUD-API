const db = require('./db')



const Follower = db.sequelize.define('followers', {
    user_id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        references: {
            model:'users',
            key: 'id',
        },
        onDelete: 'cascade'
    },
    follows: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        references: {
            model: 'users',
            key: 'id',
        },
        onDelete: 'cascade'
    }
}, {
    freezeTableName: true,
    timestamps: false
})

Follower.sync()
module.exports = Follower