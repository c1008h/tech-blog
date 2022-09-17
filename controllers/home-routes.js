const router = require('express').Router();
const { render } = require('express/lib/response');
const sequelize = require('../config/connection')
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        // {
        //   model: Blog,
        //   attributes: ['id', 'title','description','date_created','user_id'],
        //     includes:{
        //       model: Comment,
        //       attributes: ['description', 'date_created', 'user_id', 'blog_id'],
        //     }
        // },
        {
          model: Comment,
          attributes: ['id', 'description','date_created','user_id'],
          include:{
              model: User,
              attributes: ['username'],
          }
        }
      ],
    });
    console.log(blogData[0].dataValues)

    // Serialize data so the template can read it
    // returning an instant of a blog
    // const blogs = blogData.map((blogs) => blogs.get({ plain: true }));
    // console.log(blogs)
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
router.get('/blogs/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['description','date_created', 'user_id']
        }
      ]
    });

    const blogs = blogData.get({ plain: true });

    res.render('blogs', {
      blogs,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  // const userData = await User.findByPk(req.session.id, {
  //   attributes: { exclude: ['password'] },
  //   include: [{ model: Blog }],
  // });

  // if(!userData) {
  //   res.redirect('/dashboard')
  //   return;
  // } else {
  //   console.log('This username is taken.')
  // }

  res.render('signup')
})

router.get('/homepage', withAuth, async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        // {
        //   model: Blog,
        //   attributes: ['id', 'title','description','date_created','user_id'],
        //     includes:{
        //       model: Comment,
        //       attributes: ['description', 'date_created', 'user_id', 'blog_id'],
        //     }
        // },
        {
          model: Comment,
          attributes: ['id', 'description','date_created','user_id'],
          include:{
              model: User,
              attributes: ['username'],
          }
        }
      ],
    });
    console.log(blogData[0].dataValues)

    // Serialize data so the template can read it
    // returning an instant of a blog
    // const blogs = blogData.map((blogs) => blogs.get({ plain: true }));
    // console.log(blogs)
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      blogData, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
} )
module.exports = router;

