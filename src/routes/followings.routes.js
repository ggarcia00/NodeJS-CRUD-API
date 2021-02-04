const router = require('express').Router()
const Following = require('../models/Following')



router.post('/', (req, res) => {
    Following.create({
        user_id: req.body.user_id,
        followed_by: req.body.followed_by
    }).then((following) => {
        res.status(201).json(following)
    }).catch((err) => {
        res.json({error: err})
    })
})



router.get('/', (req, res) =>{
    Following.findAndCountAll({
        returning: true
    }).then( (followings) => {
        res.status(200).json({data: followings.rows, count: followings.count})
    }).catch((err) => {
        res.json({error: err})
    })
})



router.get('/:id', (req, res) => {
    Following.findAll({
        where: { user_id: req.params.id }

    }).then((followings) => {
        res.status(200).json(followings)
    }).catch((err) => {
        res.json({error: err})
    })
})



router.put('/:id/:followed_by', (req, res) => {
    Following.update({
            user_id: req.body.user_id,
            followed_by: req.body.followed_by,
        },
        {
            where: { 
                    user_id: req.params.id,
                    followed_by: req.params.followed_by
                }
        }
    ).then(() =>{
        res.status(200).end()
    }).catch((err) => {
        res.json({error: err})
    })
})



router.delete('/:id/:followed_by', (req, res) => {
    Following.destroy({
        where: {
            user_id: req.params.id,
            followed_by: req.params.followed_by
        }
    }).then(() => {
        res.status(204).end()
    }).catch((err) => {
        res.json(err)
    })
})

module.exports = router