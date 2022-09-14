const { User } = require("../models");

let userData = [

    {
        username: 'Chris', password: 'password'
    },
    {
        username: 'Susan', password: 'password'
    },
    {
        username: 'Bob', password: 'password'
    }
]

const seedUsers = () => User.bulkCreate(userData)

module.exports = seedUsers;