const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const blogData = await Blog.findAll({
      include: [User]
      // model: Comment,
      // attributes: ['id', 'description', 'blog_id', 'user_id', 'date_created'],
      // include: {
      //     model: User,
      //     attributes: ['username']
      // }
    
    });
    // const blog = blogData.map((blog) => blog.get({ plain: true }));

    console.log('are you listening here???')
    console.log(blogData)

    // const blog = blogData.map(blog => blog.get({ plain: true }));
    // console.log(blogData.blog.dataValues.user)
    // console.log(blogData.dataValues.user)
    //console.log(blogData[0].dataValues)   
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      blogData, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Specific posted blog
router.get('/blog/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      // where: {
      //   id: req.session.id,
      //   user_id: req.session.user_id
      // },
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Comment,
          attributes: ['description','date_created', 'user_id'],
          include:[{model: User, attributes:['username']}]
        }
      ]
    });

    const blogs = blogData.get({ plain: true });
    console.log('This is for getting one blogs comments')
    console.log(blogs)

    res.render('comment', {
      blogs,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json({message: "Blog not found"});
  }
});

router.get('/homepage', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });
    const user = userData.get({ plain: true });

    // Serialize data so the template can read it
    // returning an instant of a blog
    // const blogs = blogData.map((blogs) => blogs.get({ plain: true }));
    // console.log(blogs)
    res.render('homepage', { 
      ...user, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if(req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  
  res.render('signup')
})
module.exports = router;

