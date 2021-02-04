const router = require('express').Router()
const User = require('../models/User')



router.post('/', (req, res) => {
    User.create({
        nome: req.body.nome,
        email: req.body.email,
        localizacao: req.body.localizacao,
        avatar: req.body.avatar,
        username: req.body.username,
        bio: req.body.bio
    }).then((user) => {
        res.status(201).json(user)
    }).catch((err) => {
        res.json({error: err})
    })
})



router.get('/', (req, res) =>{
    User.findAndCountAll({
        returning: true
    }).then( (users) => {
        res.status(200).json({data: users.rows, count: users.count})
    }).catch((err) => {
        res.json({error: err})
    })
})



router.get('/:id', (req, res) => {
    User.findAll({
        where: { id: req.params.id }

    }).then((user) => {
        res.status(200).json(user)
    }).catch((err) => {
        res.json({error: err})
    })
})



router.put('/:id', (req, res) => {
    User.update(
        {
            nome: req.body.nome,
            email: req.body.email,
            localizacao: req.body.localizacao,
            avatar: req.body.avatar,
            username: req.body.username,
            bio: req.body.bio
        },
        {
            where: { id: req.params.id }
        }
    ).then(() =>{
        res.status(200).end()
    }).catch((err) => {
        res.json({error: err})
    })
})



router.delete('/:id', (req, res) => {
    User.destroy({
        where: {id : req.params.id}
    }).then(() => {
        res.status(204).end()
    }).catch((err) => {
        res.json({error: err})
    })
})


module.exports = router;