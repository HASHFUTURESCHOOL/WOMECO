const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Article = require('../models/article');
const auth = require('../middleware/auth');
const { generateMeaningfulEducationBlog, meaningfulEducationTopics } = require('../services/deepseekService');

// In-memory fallback cache with published articles & initial AI pending review drafts
let inMemoryArticles = [
    {
        _id: 'art-1',
        title: 'WOMECO Adopts Global AI Education Standard at 2026 Summit',
        summary: 'Over 80 Ministries of Education ratified unified ethical guidelines for AI tutors and classroom analytics.',
        content: 'Over 80 Ministries of Education ratified unified ethical guidelines for AI tutors and classroom analytics at the WOMECO Summit in Geneva. The document outlines essential safeguards for student data privacy, bias mitigation, and human teacher oversight.',
        author: 'Global Secretariat',
        category: 'Policy Landmark',
        status: 'published',
        generatedBy: 'Manual-Admin',
        publishDate: new Date('2026-08-20'),
        createdAt: new Date('2026-08-20'),
    },
    {
        _id: 'art-2',
        title: '$15 Million Fellowship Fund Announced for Rural STEM Educators',
        summary: 'Unlocking $15M in funding for solar STEM kits, high-speed satellite connectivity, and teacher stipends across developing nations.',
        content: 'The WOMECO Global Grants Committee has unlocked $15M in funding aimed at providing rural schools across Sub-Saharan Africa and South Asia with solar STEM kits, high-speed satellite connectivity, and teacher stipends.',
        author: 'Grants Committee',
        category: 'Grants & Funding',
        status: 'published',
        generatedBy: 'Manual-Admin',
        publishDate: new Date('2026-08-15'),
        createdAt: new Date('2026-08-15'),
    },
    {
        _id: 'art-3',
        title: 'Multilateral Partnership Established with UNESCO & OECD',
        summary: 'A landmark working group created to formulate globally recognized educator credentialing and cross-border teaching exchanges.',
        content: 'A landmark joint working group has been established between WOMECO, UNESCO, and the OECD to create a globally recognized credentialing framework for educators, facilitating cross-border teaching exchanges.',
        author: 'Diplomatic Affairs',
        category: 'International Alliance',
        status: 'published',
        generatedBy: 'Manual-Admin',
        publishDate: new Date('2026-08-05'),
        createdAt: new Date('2026-08-05'),
    },
    {
        _id: 'art-4',
        title: 'Future Skills Index 2026 Released: Key Findings for High School Curricula',
        summary: 'Empirical benchmark identifying emotional intelligence, ecological reasoning, and computational literacy as essential 21st-century capabilities.',
        content: 'Analyzing data from 120 member states, the 2026 Future Skills Index identifies computational literacy, ecological problem-solving, and emotional intelligence as the top required competencies for upcoming workforce demands.',
        author: 'Research Division',
        category: 'Research Report',
        status: 'published',
        generatedBy: 'Manual-Admin',
        publishDate: new Date('2026-07-28'),
        createdAt: new Date('2026-07-28'),
    },
    // Seeded AI-Generated Draft waiting in Admin Approval Queue
    {
        _id: 'ai-draft-1',
        title: 'Human-Centric AI in Classrooms: Protecting Critical Thinking in the Generative Age',
        summary: 'Guidelines on structuring artificial intelligence as a supportive inquiry partner rather than an automated homework solver.',
        content: 'As generative artificial intelligence enters classrooms worldwide, educators must balance technological empowerment with cognitive development.\n\nWOMECO recommends three core pedagogical pillars:\n1. Inquiry-Based Prompting: Students must be evaluated on their conceptual framing and verification rather than rote text generation.\n2. Teacher-in-the-Loop Safeguards: AI tools must support educator workflow without replacing human mentorship and empathetic listening.\n3. Ethical Data Privacy: Student analytics must adhere to zero-retention privacy charters.',
        author: 'WOMECO AI Research Division (DeepSeek)',
        category: 'Technology & Policy',
        topic: 'Human-Centric AI in Classrooms',
        readTime: '5 min read',
        status: 'pending_review',
        generatedBy: 'DeepSeek-AI',
        publishDate: new Date(),
        createdAt: new Date(),
    }
];

const isDbConnected = () => mongoose.connection && mongoose.connection.readyState === 1;

// GET articles (Public gets published; Admin can pass ?status=all or ?status=pending_review)
router.get('/', async (req, res) => {
    const statusQuery = req.query.status;

    if (isDbConnected()) {
        try {
            const filter = statusQuery === 'all' 
                ? {} 
                : { status: statusQuery || 'published' };
            const articles = await Article.find(filter).sort({ publishDate: -1, createdAt: -1 });
            return res.json(articles);
        } catch (err) {
            console.warn('DB read error, using in-memory articles fallback');
        }
    }

    if (statusQuery === 'all') {
        return res.json(inMemoryArticles);
    }
    if (statusQuery === 'pending_review') {
        return res.json(inMemoryArticles.filter(a => a.status === 'pending_review'));
    }
    // Default public: only published
    res.json(inMemoryArticles.filter(a => (a.status || 'published') === 'published'));
});

// GET pending review AI drafts
router.get('/pending', async (req, res) => {
    if (isDbConnected()) {
        try {
            const drafts = await Article.find({ status: 'pending_review' }).sort({ createdAt: -1 });
            return res.json(drafts);
        } catch (err) {}
    }
    res.json(inMemoryArticles.filter(a => a.status === 'pending_review'));
});

// GET topics list for manual AI triggers
router.get('/topics', (req, res) => {
    res.json(meaningfulEducationTopics);
});

// POST trigger AI Blog Generation (DeepSeek)
router.post('/generate-ai', async (req, res) => {
    try {
        const topic = req.body.topic || null;
        const generatedDraft = await generateMeaningfulEducationBlog(topic);

        if (isDbConnected()) {
            try {
                const article = new Article(generatedDraft);
                const saved = await article.save();
                inMemoryArticles.unshift(saved);
                return res.status(201).json({
                    message: 'New AI meaningful education article generated and queued for approval.',
                    article: saved
                });
            } catch (dbErr) {
                console.warn('DB save warning, caching to memory:', dbErr.message);
            }
        }

        const draftWithId = {
            _id: 'ai-' + Date.now(),
            ...generatedDraft
        };
        inMemoryArticles.unshift(draftWithId);

        res.status(201).json({
            message: 'New AI meaningful education article generated and queued for approval.',
            article: draftWithId
        });
    } catch (err) {
        console.error('AI generation error:', err);
        res.status(500).json({ message: 'Failed to generate AI blog', error: err.message });
    }
});

// PUT Approve AI Draft -> Makes it published
router.put('/:id/approve', async (req, res) => {
    const articleId = req.params.id;

    if (isDbConnected()) {
        try {
            const article = await Article.findById(articleId);
            if (article) {
                article.status = 'published';
                article.publishDate = new Date();
                if (req.body.title) article.title = req.body.title;
                if (req.body.content) article.content = req.body.content;
                if (req.body.category) article.category = req.body.category;
                if (req.body.summary) article.summary = req.body.summary;
                const updated = await article.save();
                return res.json({ message: 'Article approved and published live!', article: updated });
            }
        } catch (err) {}
    }

    const index = inMemoryArticles.findIndex(a => a._id === articleId);
    if (index === -1) return res.status(404).json({ message: 'Article not found' });

    inMemoryArticles[index] = {
        ...inMemoryArticles[index],
        ...req.body,
        status: 'published',
        publishDate: new Date()
    };

    res.json({ message: 'Article approved and published live!', article: inMemoryArticles[index] });
});

// PUT Reject AI Draft
router.put('/:id/reject', async (req, res) => {
    const articleId = req.params.id;

    if (isDbConnected()) {
        try {
            const article = await Article.findById(articleId);
            if (article) {
                article.status = 'rejected';
                await article.save();
                return res.json({ message: 'Article draft rejected.' });
            }
        } catch (err) {}
    }

    inMemoryArticles = inMemoryArticles.filter(a => a._id !== articleId);
    res.json({ message: 'Article draft dismissed.' });
});

// GET single article
router.get('/:id', async (req, res) => {
    if (isDbConnected()) {
        try {
            const article = await Article.findById(req.params.id);
            if (article) return res.json(article);
        } catch (err) {}
    }
    const item = inMemoryArticles.find(a => a._id === req.params.id);
    if (!item) return res.status(404).json({ message: 'Cannot find article' });
    res.json(item);
});

// POST new manual article
router.post('/', auth, async (req, res) => {
    const newArtData = {
        title: req.body.title || 'Untitled Article',
        content: req.body.content || '',
        author: req.body.author || 'WOMECO Staff',
        category: req.body.category || 'Policy Landmark',
        summary: req.body.summary || '',
        status: req.body.status || 'published',
        generatedBy: 'Manual-Admin',
        publishDate: new Date(),
        createdAt: new Date()
    };

    if (isDbConnected()) {
        try {
            const article = new Article(newArtData);
            const saved = await article.save();
            inMemoryArticles.unshift(saved);
            return res.status(201).json(saved);
        } catch (err) {
            console.warn('DB write error, saving to in-memory store');
        }
    }

    const created = {
        _id: 'art-' + Date.now(),
        ...newArtData,
    };
    inMemoryArticles.unshift(created);
    res.status(201).json(created);
});

// PUT update article
router.put('/:id', auth, async (req, res) => {
    if (isDbConnected()) {
        try {
            const article = await Article.findById(req.params.id);
            if (article) {
                if (req.body.title != null) article.title = req.body.title;
                if (req.body.content != null) article.content = req.body.content;
                if (req.body.author != null) article.author = req.body.author;
                if (req.body.category != null) article.category = req.body.category;
                if (req.body.summary != null) article.summary = req.body.summary;
                if (req.body.status != null) article.status = req.body.status;
                const updated = await article.save();
                return res.json(updated);
            }
        } catch (err) {}
    }

    const index = inMemoryArticles.findIndex(a => a._id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Article not found' });

    inMemoryArticles[index] = {
        ...inMemoryArticles[index],
        ...req.body,
        _id: req.params.id,
    };
    res.json(inMemoryArticles[index]);
});

// DELETE article
router.delete('/:id', auth, async (req, res) => {
    if (isDbConnected()) {
        try {
            const article = await Article.findById(req.params.id);
            if (article) {
                await article.deleteOne();
            }
        } catch (err) {}
    }

    inMemoryArticles = inMemoryArticles.filter(a => a._id !== req.params.id);
    res.json({ message: 'Deleted Article successfully' });
});

module.exports = router;