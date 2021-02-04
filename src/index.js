const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const routes = require('./routes/index.routes')

const app = express()

const sequelize = new Sequelize('githubDB', 'root', '1545', {
    host: 'localhost',
    dialect: 'mysql'
})

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(routes)





app.listen(8081)
