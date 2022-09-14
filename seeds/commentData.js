const { Comment } = require("../models");

let commentData = [

    {
        description: 'This is awesome!', 
        user_id: 2, 
        blog_id: 1
    },
    {
        description: 'Awesome content!', 
        user_id: 3, 
        blog_id: 2
    },
    {
        description: 'Not really understanding your point...', 
        user_id: 1, 
        blog_id: 3
    }
]

const seedComment = () => Comment.bulkCreate(commentData)

module.exports = seedComment;