const express = require('express');
const router = express.Router();
const commentController = require('../controller/comment');
const middleware = require('../middleware/middleware');

router.post('/', middleware.isLogin, commentController.create);
router.get('/', middleware.isLogin, commentController.findAll);
router.put('/:id', middleware.isLogin, commentController.update);
router.delete('/:id', middleware.isLogin, commentController.delete);

module.exports = router;