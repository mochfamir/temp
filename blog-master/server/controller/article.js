const Article = require('../models/article');
const helper = require('../helper/helper');

module.exports = {
    create(req, res) {
        Article.create({
            title: req.body.title,
            content: req.body.content,
            createdAt: new Date,
            comment: req.body.comment,
            user: req.currentUser._id
        })
            .then(article => {
                res.status(201).json(article)
            })
            .catch(err => {
                res.status(400).json({err: err.message})
            })
    },
    findAll(req, res) {
        Article.find({}).populate('user').populate('comment')
            .then(articles => {
                res.status(200).json(articles)
            })
            .catch(err => {
                res.status(400).json({err: err.message})
            })
    },
    findOne(req, res) {
        Article.find({
            user: req.currentUser._id
        })
            .then(articles => {
                console.log(articles.length)
                res.status(200).json(articles)
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({err: err.message})
            })
    },
    update(req, res) {
        Article.updateOne({
            _id: req.params.id
        }, req.body)
            .then(result => {
                res.status(201).json(result)
            })
            .catch(err => {
                res.status(400).json({err: err.message})
            })
    },
    delete(req, res) {
        Article.deleteOne({
            _id: req.params.id
        })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(400).json({err: err.message})
            })
    }
}