const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const blogData = await Blog.findAll({
      // include:[
      //   {
      //     model: User,
      //     attribites: ['username']
      //   }
      // ]
      include: [
        {
          model: User,
          attributes: ['username'],
        },
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
    console.log('are you listening here???')
    console.log(blogData[0])
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
router.get('/blog/:id', async (req, res) => {
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
          attributes: ['description','date_created', 'user_id']
        }
      ]
    });

    const blogs = blogData.get({ plain: true });
    console.log('This is for getting one comment')
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
    // Get all projects and JOIN with user data
    // const blogData = await User.findAll({
    //   include: [
    //     {
    //       model: User,
    //       attributes: ['username'],
    //     },
    //     {
    //       model: Comment,
    //       attributes: ['id', 'description','date_created','user_id'],
    //       include:{
    //           model: User,
    //           attributes: ['username'],
    //       }
    //     }
    //   ],
    // });
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });
    const user = userData.get({ plain: true });

    // console.log('blogData.dataValues')
    // console.log(blogData[0].dataValues)

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

