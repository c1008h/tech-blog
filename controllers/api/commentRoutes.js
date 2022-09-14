const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth')

// GET all comments
router.get('/', (req, res) => {
    Comment.findAll({})
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
})

// GET one comment by id
router.get('/:id', (req, res) => {
    Comment.findAll({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
})

// POST comment
router.post('/', withAuth, (req, res) => {
    if(req.session) {
        Comment.create({
            description: req.body.description,
            blog_id: req.body.blog_id,
            user_id: req.session.user_id,
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    }
})

// DELETE comment
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbCommentData => {
        if(!dbCommentData) {
            res.status(404).json({message: 'Comment id not found'})
            return
        }
        res.json(dbCommentData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// UPDATE comment
router.put('/:id', withAuth, (req, res) => {
    Comment.update({
        description: req.body_description
    },
    {
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        if(!dbCommentData) {
            res.status(404).json({ message: 'Comment id not found'})
            return;
        }
        res.json(dbCommentData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

module.exports = router;