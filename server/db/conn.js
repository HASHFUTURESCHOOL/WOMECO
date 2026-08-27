const mongoose = require('mongoose');

// Disable buffering so queries fail immediately instead of hanging for 10-30 seconds when offline
mongoose.set('bufferCommands', false);

const connectDB = async () => {
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/womeco';
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 1500,
        });
        console.log('MongoDB connected successfully to:', uri);
    } catch (error) {
        console.warn('MongoDB connection not active:', error.message);
        console.warn('Backend server running in high-speed in-memory store mode.');
    }
};

module.exports = connectDB;
