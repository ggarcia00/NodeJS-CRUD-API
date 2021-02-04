const db = require('./db')

const Token = db.sequelize.define('tokens', {
    user_id: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    request_date: {
        type: db.Sequelize.DATE,
        defaultValue: db.Sequelize.NOW    
    }
}, {
    freezeTableName: true,
    timestamps: false
})

Token.sync()
module.exports = Token