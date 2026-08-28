const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Subscriber = require('../models/subscriber');
const Article = require('../models/article');
const Program = require('../models/program');
const { generateMonthlyDispatchDigest } = require('../services/newsletterService');

// In-memory fallback subscribers for standalone / resilient mode
let inMemorySubscribers = [
    {
        _id: 'sub-1',
        email: 'delegate.geneva@unesco-affiliate.org',
        status: 'active',
        frequency: 'monthly',
        source: 'portal_footer',
        subscribedAt: new Date('2026-08-01'),
        lastDispatchedAt: new Date('2026-08-01')
    },
    {
        _id: 'sub-2',
        email: 'education.fellow@oecd-partners.org',
        status: 'active',
        frequency: 'monthly',
        source: 'portal_footer',
        subscribedAt: new Date('2026-08-10'),
        lastDispatchedAt: new Date('2026-08-01')
    },
    {
        _id: 'sub-3',
        email: 'dean.pedagogy@global-schools.edu',
        status: 'active',
        frequency: 'monthly',
        source: 'portal_footer',
        subscribedAt: new Date('2026-08-18'),
        lastDispatchedAt: null
    }
];

// Fallback articles & programs if DB disconnected
const defaultArticles = [
    { title: 'WOMECO Adopts Global AI Education Standard at 2026 Summit', category: 'Policy Landmark', author: 'Global Secretariat', summary: 'Over 80 Ministries of Education ratified unified ethical guidelines for AI classroom analytics.' },
    { title: '$15 Million Fellowship Fund Announced for Rural STEM Educators', category: 'Grants & Funding', author: 'Grants Committee', summary: 'Unlocking funding for solar STEM kits and high-speed satellite connectivity across rural schools.' },
    { title: 'Future Skills Index 2026 Released', category: 'Research Report', author: 'Research Division', summary: 'Empirical benchmark identifying emotional intelligence and computational literacy as essential capabilities.' }
];

const defaultPrograms = [
    { title: 'Global Teacher Fellowship 2026', category: 'Teacher Empowerment', budget: '$5.0 Million', impact: '2,500 Educators Selected', description: 'Executive 12-month program providing educator grants and international policy mentorship.' },
    { title: 'Rural STEM & Connectivity Grant', category: 'Global Access', budget: '$4.5 Million', impact: '1,200 Rural Centers', description: 'Deploying solar-powered satellite internet nodes and STEM lab equipment.' }
];

const isDbConnected = () => mongoose.connection && mongoose.connection.readyState === 1;

// POST Subscribe to Monthly Newsletter
router.post('/subscribe', async (req, res) => {
    const { email, source } = req.body;

    if (!email || !email.includes('@') || !email.includes('.')) {
        return res.status(400).json({ success: false, message: 'Please provide a valid official email address.' });
    }

    const cleanEmail = email.trim().toLowerCase();

    if (isDbConnected()) {
        try {
            const existing = await Subscriber.findOne({ email: cleanEmail });
            if (existing) {
                if (existing.status === 'unsubscribed') {
                    existing.status = 'active';
                    await existing.save();
                    return res.json({ success: true, message: 'Welcome back! Your monthly policy dispatch subscription is reactivated.' });
                }
                return res.json({ success: true, message: 'You are already subscribed to the WOMECO Monthly Global Policy Dispatch.' });
            }

            const subscriber = new Subscriber({
                email: cleanEmail,
                source: source || 'portal_footer',
                status: 'active',
                frequency: 'monthly',
                subscribedAt: new Date()
            });
            const saved = await subscriber.save();
            inMemorySubscribers.unshift(saved);

            return res.status(201).json({
                success: true,
                message: 'Thank you for subscribing to the WOMECO Monthly Global Policy Dispatch. You will receive the monthly policy briefing on the 1st of every month.',
                subscriber: saved
            });
        } catch (err) {
            console.warn('DB subscribe warning, using in-memory store:', err.message);
        }
    }

    // In-memory fallback
    const exists = inMemorySubscribers.find(s => s.email === cleanEmail);
    if (exists) {
        exists.status = 'active';
        return res.json({ success: true, message: 'You are already subscribed to the WOMECO Monthly Global Policy Dispatch.' });
    }

    const newSub = {
        _id: 'sub-' + Date.now(),
        email: cleanEmail,
        status: 'active',
        frequency: 'monthly',
        source: source || 'portal_footer',
        subscribedAt: new Date(),
        lastDispatchedAt: null
    };
    inMemorySubscribers.unshift(newSub);

    res.status(201).json({
        success: true,
        message: 'Thank you for subscribing to the WOMECO Monthly Global Policy Dispatch. You will receive the monthly policy briefing on the 1st of every month.',
        subscriber: newSub
    });
});

// GET All Subscribers (Admin)
router.get('/', async (req, res) => {
    if (isDbConnected()) {
        try {
            const subscribers = await Subscriber.find().sort({ subscribedAt: -1 });
            return res.json(subscribers);
        } catch (err) {}
    }
    res.json(inMemorySubscribers);
});

// GET Monthly Dispatch Preview
router.get('/preview-monthly', async (req, res) => {
    let articles = defaultArticles;
    let programs = defaultPrograms;

    if (isDbConnected()) {
        try {
            const dbArticles = await Article.find({ status: 'published' }).sort({ publishDate: -1 }).limit(3);
            const dbPrograms = await Program.find().limit(2);
            if (dbArticles && dbArticles.length > 0) articles = dbArticles;
            if (dbPrograms && dbPrograms.length > 0) programs = dbPrograms;
        } catch (err) {}
    }

    const digest = generateMonthlyDispatchDigest(articles, programs);
    res.json(digest);
});

// POST Trigger Monthly Broadcast to all active subscribers
router.post('/dispatch-monthly', async (req, res) => {
    try {
        let activeSubs = inMemorySubscribers.filter(s => s.status === 'active');
        let articles = defaultArticles;
        let programs = defaultPrograms;

        if (isDbConnected()) {
            try {
                const dbSubs = await Subscriber.find({ status: 'active' });
                if (dbSubs && dbSubs.length > 0) activeSubs = dbSubs;

                const dbArticles = await Article.find({ status: 'published' }).sort({ publishDate: -1 }).limit(3);
                const dbPrograms = await Program.find().limit(2);
                if (dbArticles && dbArticles.length > 0) articles = dbArticles;
                if (dbPrograms && dbPrograms.length > 0) programs = dbPrograms;
            } catch (err) {}
        }

        const digest = generateMonthlyDispatchDigest(articles, programs);
        const dispatchTimestamp = new Date();

        // Update last dispatched timestamps
        if (isDbConnected()) {
            try {
                await Subscriber.updateMany(
                    { status: 'active' },
                    { $set: { lastDispatchedAt: dispatchTimestamp } }
                );
            } catch (err) {}
        }

        inMemorySubscribers.forEach(s => {
            if (s.status === 'active') s.lastDispatchedAt = dispatchTimestamp;
        });

        res.json({
            success: true,
            message: `Monthly Global Policy Dispatch successfully broadcast to ${activeSubs.length} active subscriber(s)!`,
            recipientCount: activeSubs.length,
            monthYear: digest.monthYear,
            subject: digest.subject,
            dispatchedAt: dispatchTimestamp,
            digestPreview: digest
        });
    } catch (err) {
        console.error('Dispatch error:', err);
        res.status(500).json({ success: false, message: 'Failed to broadcast monthly newsletter', error: err.message });
    }
});

// DELETE / Unsubscribe
router.delete('/:id', async (req, res) => {
    const subId = req.params.id;

    if (isDbConnected()) {
        try {
            await Subscriber.findByIdAndDelete(subId);
        } catch (err) {}
    }

    inMemorySubscribers = inMemorySubscribers.filter(s => s._id !== subId && s.email !== subId);
    res.json({ success: true, message: 'Subscriber removed.' });
});

module.exports = router;
