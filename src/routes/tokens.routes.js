const router = require('express').Router()
const Token = require('../models/Token')  



router.post('/', (req, res) => {
    Token.create({
        user_id: req.body.user_id
    }).then((token) => {
        res.status(201).json(token)
    }).catch((err) => {
        res.json({error: err})
    })
})



router.get('/', (req, res) =>{
    Token.findAndCountAll({
        returning: true
    }).then( (token) => {
        res.status(200).json({data: token.rows, count: token.count})
    }).catch((err) => {
        res.json({error: err})
    })
})



router.get('/:id', (req, res) => {
    Token.findAll({
        where: { user_id: req.params.id }

    }).then((token) => {
        res.status(200).json(token)
    }).catch((err) => {
        res.json({error: err})
    })
})



router.put('/:id', (req, res) => {
    Token.update(
        {
            request_date: req.body.request_date
        },
        {
            where: { user_id: req.params.id }
        }
    ).then(() =>{
        res.status(200).end()
    }).catch((err) => {
        res.json({error: err})
    })
})



router.delete('/:id', (req, res) => {
    Token.destroy({
        where: {user_id : req.params.id}
    }).then(() => {
        res.status(204).end()
    }).catch((err) => {
        res.json({error: err})
    })
})


module.exports = router;