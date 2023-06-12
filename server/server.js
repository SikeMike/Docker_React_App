const express = require('express');
const cors = require('cors');

const connectDb = require('./database/mongodb');
const userRoutes = require('./routes/userRoutes');

// Create express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDb();

// Define routes
app.use('/api', userRoutes);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
