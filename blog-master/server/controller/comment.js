const Comment = require('../models/comment');

module.exports = {
    create(req, res) {
        Comment.create({
            content: req.body.content,
            user: req.currentUser.id,
            createdAt: new Date
        })
            .then(comment => {
                res.status(201).json(comment);
            })
            .catch(err => {
                res.status(400).json({err: err.messsage})
            })
    },
    findAll(req, res) {
        Comment.find({})
            .then(comments => {
                res.status(200).json(comments)
            })
    },
    update(req, res) {
        Comment.updateOne({
            _id: req.params.id
        }, req.body)
            .then(result => {
                res.status(201).json(result);
            })
            .catch(err => {
                res.status(400).json({err: err.messsage})
            })
    },
    delete(req, res) {
        Comment.deleteOne({
            _id: req.params.id
        })
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(400).json({err: err.messsage})
            })
    }
}