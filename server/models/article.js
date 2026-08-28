const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        default: 'Meaningful Education Policy',
    },
    summary: {
        type: String,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        default: 'WOMECO Secretariat',
    },
    status: {
        type: String,
        enum: ['published', 'pending_review', 'rejected'],
        default: 'published',
    },
    generatedBy: {
        type: String,
        default: 'Manual-Admin',
    },
    topic: {
        type: String,
    },
    readTime: {
        type: String,
        default: '5 min read',
    },
    publishDate: {
        type: Date,
        default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Article', ArticleSchema);
