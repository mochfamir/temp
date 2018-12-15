const helper = require('../helper/helper');
const User = require('../models/user');

module.exports = {
    isLogin(req, res, next) {
        helper.decodeToken(req.headers.token, function(err, data) {
            if (err) {
                res.status(400).json(err)
            } else {
                User.findOne({
                    email: data.email
                })
                    .then(user => {
                        req.currentUser = user
                        next()
                    })
                    .catch(err => {
                        res.status(400).json({msg: "User must log in!"})
                    })
            }
        })
    }
};