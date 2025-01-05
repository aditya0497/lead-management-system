const express = require('express');
const leadController = require('../controllers/leadController');

const router = express.Router();

// Get all leads
router.get('/leads', leadController.getLeads);  

// Add a new lead
router.post('/leads', leadController.addLead);

// Get a lead by ID
router.get('/leads/:id', leadController.getLeadById);

// Delete a lead by ID
router.delete('/leads/:id', leadController.deleteLead);

module.exports = router;
