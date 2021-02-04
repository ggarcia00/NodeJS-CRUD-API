const router = require('express').Router()
const Repository = require('../models/Repository')
const User = require('../models/User')      


router.post('/', (req, res) => {
    Repository.create({
        nome: req.body.nome,
        description: req.body.description,
        public: req.body.public,
        user_id: req.body.user_id,

        slug: User.findOne({
            where: { id: req.body.user_id },
            attributes: ['id'],
            plain: true,
        }) + '-' + req.body.nome

    }).then((repository) => {
        res.status(201).json(repository)
    })
})


//retorna todos os repositorios cadastrasdos
router.get('/', (req, res) => {
    Repository.findAndCountAll({
        returning: true 
    }).then( (repositories) => {
        res.status(200).json({data: repositories.rows, count: repositories.count})
    }).catch((err) => {
        res.json({error: err})
    })
})


//retorna todos os repositorios de um usuario referenciado por 'id'
router.get('/:id', (req, res) => {
    Repository.findAndCountAll({
        where: { user_id: req.params.id },
        returning: true
    }).then((repositories) => {
        res.status(200).json({data: repositories.rows, count: repositories.count})
    }).catch((err) => {
        res.json({error: err})
    })
})


//retorna o repositorio identificado por seu slug '<username>-<repository_name>'
router.get('/:user-:repo', (req, res) => {
    Repository.findOne({
        where: { slug: req.params.user + '-' + req.params.repo },
    }).then(repository => {
        res.status(200).json(repository)
    }).catch((err) => {
        res.json({error: err})
    })
})


//faz UPDATE do repositorio identificado por user_id e nome do repositorio
router.put('/:id/:nome', (req, res) => {
    Repository.update(
        {
            description: req.body.description,
            public: req.body.public,
        },
        {
            where: { 
                user_id: req.params.id,
                nome: req.params.nome
            }
        }
    ).then(() =>{
        res.status(200).end()
    }).catch((err) => {
        res.json({error: err})
    })
})


//faz UPDATE do repositorio identificado por seu slug '<username>-<repository_name>'
router.put('/:user-:repo', (req, res) => {
    Repository.update(
        {
            description: req.body.description,
            public: req.body.public,
        },
        {
            where: { slug: req.params.user + '-' + req.params.repo },
        }
    ).then(() =>{
        res.status(200).end()
    }).catch((err) => {
        res.json({error: err})
    })
})



//DELETE pelo user_id e nome do repositorio
router.delete('/:id/:nome', (req, res) => {
    Repository.destroy({
        where: { 
            user_id: req.params.id,
            nome: req.params.nome
        }
    }).then(() => {
        res.status(204).end()
    }).catch((err) => {
        res.json({error: err})
    })
})


//DELETE pelo slug
router.delete('/:user-:repo', (req, res) => {
    Repository.destroy({
        where: { slug: req.params.user + '-' + req.params.repo}
    }).then(() => {
        res.status(204).end()
    }).catch((err) => {
        res.json({error: err})
    })
})


module.exports = router