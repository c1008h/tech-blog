const router = require('express').Router();
const { User, Blog} = require('../models')
const withAuth = require('../utils/auth')

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await Blog.findByPk(req.session.id, {
        where: { "user_id": req.session.user_id },
        include: [User],
      });
      console.log(userData)
      const user = userData.map((post) => post.get({ plain: true }))
  
      res.render('dashboard', {
        ...user,
        // logged_in: true
      });
    } catch (err) {
        res.redirect('login')
      res.status(500).json(err);
    }
});