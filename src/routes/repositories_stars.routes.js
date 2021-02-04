const router = require('express').Router()
const RepositoryStar = require('../models/RepositoryStar')  


//  create
router.post('/', (req, res) => {
    RepositoryStar.create({
        user_id: req.body.user_id,
        repo_slug: req.body.repo_slug
    }).then((repositoryStar) => {
        res.status(201).json(repositoryStar)
    })
})


//retorna todos as stars cadastrasdas
router.get('/', (req, res) => {
    RepositoryStar.findAndCountAll({
        returning: true 
    }).then( (repositories) => {
        res.status(200).json({data: repositories.rows, count: repositories.count})
    }).catch((err) => {
        res.json({error: err})
    })
})


//retorna todas as stars de um repositorio
router.get('/:repo_slug', (req, res) => {
    RepositoryStar.findAndCountAll({
        where: { repo_slug: req.params.repo_slug },
        returning: true
    }).then((repositories) => {
        res.status(200).json({data: repositories.rows, count: repositories.count})
    }).catch((err) => {
        res.json({error: err})
    })
})



router.put('/:repo_slug', (req, res) => {
    RepositoryStar.update(
        {
            user_id: req.body.user_id,
        },
        {
            where: { 
                repo_slug: req.params.repo_slug
            }
        }
    ).then(() =>{
        res.status(200).end()
    }).catch((err) => {
        res.json({error: err})
    })
})



//DELETE pelo slug
router.delete('/:repo_slug', (req, res) => {
    RepositoryStar.destroy({
        where: { 
            repo_slug: req.params.repo_slug,
        }
    }).then(() => {
        res.status(204).end()
    }).catch((err) => {
        res.json({error: err})
    })
})


module.exports = router