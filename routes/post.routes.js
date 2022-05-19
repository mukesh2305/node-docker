const express = require('express');

const postController = require('../controllers/post.controllers');
const protect = require('../middleware/user.middleware');

const router = express.Router();

router.get('/', protect, postController.getAllPosts);
router.get('/:id', protect, postController.getOnePost);
router.post('/', protect, postController.createPost);
router.put('/:id', protect, postController.updatePost);
router.delete('/:id', protect, postController.deletePost);


module.exports = router;