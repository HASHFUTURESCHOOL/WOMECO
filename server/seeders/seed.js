
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Article = require('../models/article');
const Program = require('../models/program');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected for seeding');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

const seedDB = async () => {
    await connectDB();

    try {
        // Clear existing data
        await User.deleteMany({});
        await Article.deleteMany({});
        await Program.deleteMany({});
        console.log('Existing data cleared');

        // Create a default admin user
        const adminUser = new User({
            name: 'Admin User',
            email: 'admin@womeco.org',
            password: 'password', // Password will be hashed by pre-save hook
        });
        await adminUser.save();
        console.log('Admin user created');

        // Create sample articles
        const articles = [
            {
                title: 'The Future of Education',
                content: 'Exploring innovative approaches to learning in the 21st century.',
                author: 'WOMECO Team',
            },
            {
                title: 'Meaningful Learning in Practice',
                content: 'Case studies of schools implementing meaningful education principles.',
                author: 'Dr. Jane Doe',
            },
        ];
        await Article.insertMany(articles);
        console.log('Sample articles created');

        // Create sample programs
        const programs = [
            {
                title: 'Global Education Summit',
                description: 'An annual summit bringing together leaders in education from around the world.',
            },
            {
                title: 'Teacher Training Workshop',
                description: 'Workshops designed to equip educators with tools for meaningful teaching.',
            },
        ];
        await Program.insertMany(programs);
        console.log('Sample programs created');

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Error seeding database:', err.message);
        process.exit(1);
    }
};

seedDB();
