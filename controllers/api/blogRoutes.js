const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });
  console.log(newBlog)
    res.status(200).json(newBlog);
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
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blog', async (req, res) => {
  try {
    const allBlog = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Comment,
          attributes: ['id', 'description','date_created','user_id'],
          include: [
            {
              model: User,
              attributes: ['username'],
            }
          ]
        }
      ]
    })
    console.log(allBlog)
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
      title: req.body.title,
      description: req.body.description
    },
    {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      }
      //   title: req.body.title,
      //   description: req.body.description
    });
    console.log('blogdata for blogRoutes put:' + blogData)
    res.status(200).json(blogData);
  } catch (err) {
    res.status(400).json(err);
  }
});



module.exports = router;
