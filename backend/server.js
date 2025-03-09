// server.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./config/db');
const { PORT } = require('./config/env');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const bidRoutes = require('./routes/bidRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const bidRoutes = require('./routes/bidRoutes');
const errorHandler = require('./utils/errorHandler');
const bodyParser = require('body-parser');
const cors = require('cors');

connectDB();
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: process.env.FRONTEND_URL }));

// Mount your routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/bids', bidRoutes);
app.use('/api/payments', paymentRoutes);
app.use(errorHandler);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/bids', bidRoutes);


// Create an HTTP server and attach Socket.IO
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"]
  }
});
// Save io instance to the app so controllers can access it
app.set('io', io);

server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
