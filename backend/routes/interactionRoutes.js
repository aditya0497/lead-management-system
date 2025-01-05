const express = require('express');
const interactionController = require('../controllers/interactionController');

const router = express.Router();

// Get interactions for a lead
router.get('/leads/:leadId/interactions', interactionController.getInteractions);

// Add an interaction
router.post('/interactions', interactionController.addInteraction);

module.exports = router;
