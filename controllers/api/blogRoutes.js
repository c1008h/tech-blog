const router = require('express').Router();
const { Blog, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/blog', async (req, res) => {
  try {
    //const allBlog = 
    await Blog.findAll({
      // include: [
      //   {
      //     model: User,
      //     attributes: ['username']
      //   },
      //   {
      //     model: Comment,
      //     attributes: ['id', 'description','date_created','user_id'],
      //     include: [
      //       {
      //         model: User,
      //         attributes: ['username'],
      //       }
      //     ]
      //   }
      // ]
    })
  } catch(err) {
    res.status(500).json(err)
  }
})

router.post('/blog', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      //...req.body,
      id: req.session.id,
      title: req.body.title,
      description: req.body.description,
      date_created: req.body.date_created,
      user_id: req.body.user_id
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.update({
      where: {
        id: req.params.id,
      
        user_id: req.session.user_id,
      },
        title: req.body.title,
        description: req.body.description
    });

    res.status(200).json(blogData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
