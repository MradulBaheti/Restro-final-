// Load environment variables first
require('dotenv').config();

// Core module imports
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Local module imports
const connectDB = require('./config/database');
const config = require("./config/config");
const globalErrorHandler = require('./middleware/globalErrorHandler');

// Initialize app and port
const app = express();
const PORT = config.PORT;

// --- Database Connection ---
connectDB();

// --- Core Middlewares ---
app.use(cors({
    credentials: true,
    origin: ["http://localhost:5173"] // Your frontend URL
}));
app.use(express.json()); // Parses incoming JSON requests
app.use(cookieParser()); // Parses cookies

// --- API Routes ---

// Root endpoint for simple health check
app.get('/', (req, res) => {
    res.json({ message: "Hello from Express server" });
});

// Other endpoints
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/order", require("./routes/orderRoute"));
app.use("/api/table", require("./routes/tableRoutes"));

// FIX: Corrected route prefix and file name
// 1. Prefix is "/api/payment" (with a 't') to match your frontend API calls.
// 2. File is "payementRoute" (singular) to match your backend file name 'payementRoute.js'.
app.use("/api/payment", require("./routes/payementRoute"));

// --- Error Handling ---
// Global error handler must be *after* all routes
app.use(globalErrorHandler);

// --- Server Start ---
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});