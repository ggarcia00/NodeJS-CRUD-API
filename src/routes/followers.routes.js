const router = require('express').Router()
const Follower = require('../models/Follower')



router.post('/', (req, res) => {
    Follower.create({
        user_id: req.body.user_id,
        follows: req.body.follows
    }).then((follower) => {
        res.status(201).json(follower)
    }).catch((err) => {
        res.json({error: err})
    })
})



router.get('/', (req, res) =>{
    Follower.findAndCountAll({
        returning: true
    }).then( (followers) => {
        res.status(200).json({data: followers.rows, count: followers.count})
    }).catch((err) => {
        res.json({error: err})
    })
})



router.get('/:id', (req, res) => {
    Follower.findAll({
        where: { user_id: req.params.id }

    }).then((followers) => {
        res.status(200).json(followers)
    }).catch((err) => {
        res.json({error: err})
    })
})



router.put('/:id/:follows', (req, res) => {
    Follower.update({
            user_id: req.body.user_id,
            follows: req.body.follows,
        },
        {
            where: { 
                    user_id: req.params.id,
                    follows: req.params.follows
                }
        }
    ).then(() =>{
        res.status(200).end()
    }).catch((err) => {
        res.json({error: err})
    })
})



router.delete('/:id/:follows', (req, res) => {
    Follower.destroy({
        where: {
            user_id: req.params.id,
            follows: req.params.follows
        }
    }).then(() => {
        res.status(204).end()
    }).catch((err) => {
        res.json(err)
    })
})

module.exports = router