const routes = require('express').Router()

const appRouter = require('./app.routes')

const usersRouter = require('./users.routes')
const tokensRouter = require('./tokens.routes')
const followersRouter = require('./followers.routes')
const followingsRouter = require('./followings.routes')
const repositoriesRouter = require('./repositories.routes')
const repositoriesStarsRouter = require('./repositories_stars.routes')

// APP ROUteS
routes.use('/', appRouter)


//  CRUD ROUTES
routes.use('/users', usersRouter)
routes.use('/tokens', tokensRouter)
routes.use('/followers', followersRouter)
routes.use('/followings', followingsRouter)
routes.use('/repositories', repositoriesRouter)
routes.use('/repositories_stars', repositoriesStarsRouter)


module.exports = routes