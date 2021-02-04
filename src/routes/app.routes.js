const db = require('../models/db')
const { QueryTypes } = require('sequelize');
const router = require('express').Router()
const User = require('../models/User')
const Token = require('../models/Token')




router.post('/login', (req, res) => {
    User.findOne({
        where: { id: req.body.id }
    }).then((user) => {
        if(user != null ) {
            res.status(200).json(user)
            Token.create({
                user_id: req.body.id
            })
        }
        else 
            res.status(404).json({status: 'user not found'})
    }).catch((err) => {
        res.json({error: err})
    })
})

//perfil
//Varias tentativas pra dar join ou pra varias tabelas com os models do sequelize, então raw query resolve por enquanto
router.get('/profile/:id', (req, res) => {
    db.sequelize.query(`SELECT nome, email, localizacao, avatar, username, bio, followers, followings, repos FROM users, 
        (SELECT count(*) as followers from followers WHERE user_id = ${req.params.id}) fe,
        (SELECT count(*) as followings from followings WHERE user_id = ${req.params.id}) fi,
        (SELECT count(*) as repos from repositories WHERE user_id = ${req.params.id}) repos
        WHERE id = ${req.params.id};`, { type: QueryTypes.SELECT }
    ).then(result => {
        res.status(200).json(result)
    }).catch((err) => {
        res.json({error: err})
    })
})


//repositorios
router.get('/repositories/:id', (req, res) => {
    db.sequelize.query(`SELECT nome, description, public, slug, count(repositories_stars.repo_slug) as stars FROM repositories
        LEFT JOIN repositories_stars ON repositories.slug = repositories_stars.repo_slug
        WHERE repositories.user_id = ${req.params.id}
        GROUP BY slug;`, { type: QueryTypes.SELECT }
    ).then(result => {
        res.status(200).json(result)
    }).catch((err) => {
        res.json({error: err})
    })
})


//seguidores
router.get('/followings/:id', (req, res) => {
    db.sequelize.query(`SELECT followed_by, username, avatar FROM followings, users
        WHERE followings.user_id = ${req.params.id} AND users.id = followings.followed_by;`, { type: QueryTypes.SELECT }
    ).then(result => {
        res.status(200).json({data: result, count: result.length})
    }).catch((err) => {
        res.json({error: err})
    })
})



//seguindo
router.get('/followers/:id', (req, res) => {
    db.sequelize.query(`SELECT follows, username, avatar FROM followers, users
        WHERE followers.user_id = ${req.params.id} AND users.id = followers.follows;`, { type: QueryTypes.SELECT }
    ).then(result => {
        res.status(200).json({data: result, count: result.length})
    }).catch((err) => {
        res.json({error: err})
    })
})


module.exports = router