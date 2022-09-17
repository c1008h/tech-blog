const router = require('express').Router();
const Comment = require('../../models');

// route to create/add a dish
router.post('/', async (req, res) => {
  try {
    const commentData = await Comment.create({
      description: req.body.description,
      date_created: req.body.date_created,
      user_id: req.body.user_id,
      blog_id: req.body.blog_id,
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// According to MVC, what is the role of this action method?
// This action method is the Controller. It accepts input and sends data to the Model and the View.
router.put('/:id', async (req, res) => {
  // Where is this action method sending the data from the body of the fetch request? Why?
  // It is sending the data to the Model so that one dish can be updated with new data in the database.
  try {
    const comment = await Comment.update(
      {
        description: req.body.description,
        date_created: req.body.date_created,
        user_id: req.body.user_id,
        blog_id: req.body.blog_id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    // If the database is updated successfully, what happens to the updated data below?
    // The updated data (dish) is then sent back to handler that dispatched the fetch request.
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
