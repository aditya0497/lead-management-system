// backend/index.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const leadRoutes = require('./routes/leadRoutes');
const interactionRoutes = require('./routes/interactionRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', leadRoutes); // Routes for leads
app.use('/api', interactionRoutes); // Routes for interactions

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
