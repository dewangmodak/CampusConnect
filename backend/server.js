// server.js
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');
const eventsRoutes = require('./routes/events');
const chatbotRoutes = require('./routes/chatbot');

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json({ limit: '5mb' })); // allow large base64 images if you use them

const PORT = process.env.PORT || 5000;

// connect DB
connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/campusconnect');

// routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/chatbot', chatbotRoutes);

app.get('/', (req, res) => res.send('CampusConnect backend running'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
