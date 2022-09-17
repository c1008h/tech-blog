const router = require("express").Router();
const { Blog, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, (req, res) => {
  Blog.findAll({
      where: {
        user_id: req.session.user_id
      },
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
    .then(blogData => {
      const blog = blogData.map((blog) => blog.get({ plain: true }));
      console.log('this is console logging blog:')
      console.log(blog)
      res.render("dashboard", {
        // layout: "dashboard",
        blog
      });
    })
    .catch(err => {
      console.log(err);
      res.redirect("login");
    });
  });

  router.get("/new", withAuth, (req, res) => {
    res.render("new", {
      layout: "dashboard"
    });
  });
  
  router.get("/edit/:id", withAuth, (req, res) => {
    Blog.findByPk(req.params.id)
      .then(blogData => {
        if (blogData) {
          const blog = blogData.get({ plain: true });
          
          res.render("edit", {
            layout: "dashboard",
            blog
          });
        } else {
          res.status(404).end();
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });
  
module.exports = router;