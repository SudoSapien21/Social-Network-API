const express = require('express');
const router = express.Router();
const reactionController = require('../controllers/reactionController');

// Define reaction routes
router.post('/', reactionController.createReaction);
router.delete('/:reactionId', reactionController.deleteReaction);

module.exports = router;