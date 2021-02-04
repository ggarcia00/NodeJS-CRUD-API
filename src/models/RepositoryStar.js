const db = require('./db')

const RepositoryStar = db.sequelize.define('repositories_stars', {
    user_id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        references: {
            model: 'users',
            key: 'id'
        },
        onDelete: 'cascade'
    },
    repo_slug: {
        type: db.Sequelize.STRING,
        primaryKey: true,
        references: {
            model: 'repositories',
            key: 'slug'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
    }
}, {
    freezeTableName: true,
    timestamps: false
})

RepositoryStar.sync()
module.exports = RepositoryStar