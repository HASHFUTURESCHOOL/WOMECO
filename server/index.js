require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/conn');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
}));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/articles', require('./routes/articles'));
app.use('/api/users', require('./routes/users'));
app.use('/api/programs', require('./routes/programs'));
app.use('/api/subscribers', require('./routes/subscribers'));

app.get('/api', (req, res) => {
    res.json({ message: 'Welcome to the WOMECO API', status: 'online', timestamp: new Date() });
});

app.get('/', (req, res) => {
    res.send('Welcome to the WOMECO API');
});

// Run standalone server when not running in Vercel Serverless environment
if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
}

module.exports = app;
