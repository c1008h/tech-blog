const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const seedUsers = require('./userData');
const seedBlog = require('./blogData.js');
const seedComment = require('./commentData')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log('anything done')
  await seedUsers();
  // const users = await User.bulkCreate(userData, {
  //   individualHooks: true,
  //   returning: true,
  // });
  await seedBlog();
  // for (const blog of blogData) {
  //   await Blog.create({
  //     ...blog,
  //     user_id: users[Math.floor(Math.random() * users.length)].id,
  //   });
  // }
  // for (const comment of commentData) {
  //     await Comment.create({
  //         ...comment,
  //         user_id: users
  //     })
  // }
  await seedComment()

  process.exit(0);
};

seedDatabase();
