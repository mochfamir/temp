const User = require('../models/user');
const helper = require('../helper/helper');

module.exports = {
    register(req, res) {
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                res.status(400).json({err: err.message})
            });
    },
    login(req, res) {
        User.findOne({
            email: req.body.email
        })
            .then(user => {
                if(helper.comparePassword(req.body.password, user.password)) {
                    let token = helper.generateToken(user._id, user.email)
                    res.status(200).json({token})
                } else {
                    res.status(400).json({err: 'invalid password'})
                }
            })
            .catch(err => {
                console.log(err.message)
                res.status(400).json({err: 'User not found!'})
            })
    }
};