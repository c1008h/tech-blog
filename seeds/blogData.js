const { Blog } = require('../models')

const blogData = [{
    title: 'How to Code',
    description: 'Install VSC on your system...',
    user_id: 1
},
{
    title: 'How to Play on Laptop',
    description: 'Do not install video games...',
    user_id: 2
},
{   
    title: 'How to Cook',
    description: 'Look up cooking videos on Youtube',
    user_id: 3
}]

const seedBlog = () => Blog.bulkCreate(blogData)

module.exports = seedBlog;