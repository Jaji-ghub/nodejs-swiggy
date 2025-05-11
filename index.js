// index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv")
const vendorRoutes = require("./routes/vendorRoute")
const bodyParser = require("body-parser")
const firmRoute = require("./routes/firmRoute")
const productRoute = require("./routes/productRoute")
const path = require("path")

const app = express();
dotenv.config()

// Middleware to parse JSON
app.use(express.json());



// Connect to MongoDB
mongoose.connect(process.env.Mongo_url)
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));


//Creating middleware
app.use(bodyParser.json())
app.use("/vendor", vendorRoutes)
app.use("/firm", firmRoute)
app.use("/product",productRoute)
app.use("/uploads", express.static("uploads"))

// Simple route
app.get('/', (req, res) => {
  res.send('MongoDB Connected!');
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
