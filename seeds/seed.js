const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const userData = require('./userData');
console.log(userData)
const blogData = require('./blogData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const blog of blogData) {
    await Blog.create({
      ...blog,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  for (const comment of commentData) {
      await Comment.create({
          ...comment,
          user_id: users
      })
  }

  process.exit(0);
};

seedDatabase();
