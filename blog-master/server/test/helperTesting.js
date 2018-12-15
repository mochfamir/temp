const User = require('../models/user');
const Article = require('../models/article');
const Comment = require('../models/comment');

module.exports = {
    createUser() {
        return User.create({
                name: "Mochamad Faishal Amir",
                email: "faishal@mail.com",
                password: "123456789"
            })
        },
    createComment() {
        return Comment.create({
            content: 'ini comment',
            user: '5c0e76b22edbf64207509fe4'
        })
    }
}