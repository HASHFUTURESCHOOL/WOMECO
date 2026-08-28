const mongoose = require('mongoose');

const SubscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    status: {
        type: String,
        enum: ['active', 'unsubscribed'],
        default: 'active',
    },
    frequency: {
        type: String,
        default: 'monthly',
    },
    source: {
        type: String,
        default: 'portal_footer',
    },
    subscribedAt: {
        type: Date,
        default: Date.now,
    },
    lastDispatchedAt: {
        type: Date,
    }
});

module.exports = mongoose.model('Subscriber', SubscriberSchema);
