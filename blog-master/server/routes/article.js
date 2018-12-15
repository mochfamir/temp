var express = require('express');
var router = express.Router();
const articleController = require('../controller/article');
const middleware = require('../middleware/middleware');

router.get('/', middleware.isLogin, articleController.findAll);
router.get('/me', middleware.isLogin, articleController.findOne);
router.post('/', middleware.isLogin, articleController.create);
router.put('/:id', middleware.isLogin, articleController.update);
router.delete('/:id', middleware.isLogin, articleController.delete);

module.exports = router;
