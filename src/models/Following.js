const db = require('./db')

const Following = db.sequelize.define('followings', {
    user_id:{
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        references: {
            model: 'users',
            key: 'id'
        },
        onDelete: 'cascade'
    },
    followed_by: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        references: {
            model: 'users',
            key: 'id'
        },
        onDelete: 'cascade'
    }
}, {
    freezeTableName: true,
    timestamps: false
})

Following.sync()
module.exports = Following