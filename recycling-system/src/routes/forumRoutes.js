const express = require('express');
const forumController = require('../controllers/forumController');
const router = express.Router();

router.get('/', forumController.getForumPosts);
router.post('/', forumController.addForumPost);

module.exports = router;
