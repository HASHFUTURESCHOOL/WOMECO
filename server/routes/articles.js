const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Article = require('../models/article');
const auth = require('../middleware/auth');

// In-memory fallback cache
let inMemoryArticles = [
    {
        _id: 'art-1',
        title: 'WOMECO Adopts Global AI Education Standard at 2026 Summit',
        content: 'Over 80 Ministries of Education ratified unified ethical guidelines for AI tutors and classroom analytics at the WOMECO Summit in Geneva. The document outlines essential safeguards for student data privacy, bias mitigation, and human teacher oversight.',
        author: 'Global Secretariat',
        category: 'Policy Landmark',
        publishDate: new Date('2026-08-20'),
    },
    {
        _id: 'art-2',
        title: '$15 Million Fellowship Fund Announced for Rural STEM Educators',
        content: 'The WOMECO Global Grants Committee has unlocked $15M in funding aimed at providing rural schools across Sub-Saharan Africa and South Asia with solar STEM kits, high-speed satellite connectivity, and teacher stipends.',
        author: 'Grants Committee',
        category: 'Grants & Funding',
        publishDate: new Date('2026-08-15'),
    },
    {
        _id: 'art-3',
        title: 'Multilateral Partnership Established with UNESCO & OECD',
        content: 'A landmark joint working group has been established between WOMECO, UNESCO, and the OECD to create a globally recognized credentialing framework for educators, facilitating cross-border teaching exchanges.',
        author: 'Diplomatic Affairs',
        category: 'International Alliance',
        publishDate: new Date('2026-08-05'),
    },
    {
        _id: 'art-4',
        title: 'Future Skills Index 2026 Released: Key Findings for High School Curricula',
        content: 'Analyzing data from 120 member states, the 2026 Future Skills Index identifies computational literacy, ecological problem-solving, and emotional intelligence as the top required competencies for upcoming workforce demands.',
        author: 'Research Division',
        category: 'Research Report',
        publishDate: new Date('2026-07-28'),
    },
];

const isDbConnected = () => mongoose.connection && mongoose.connection.readyState === 1;

// GET all articles
router.get('/', async (req, res) => {
    if (isDbConnected()) {
        try {
            const articles = await Article.find().sort({ publishDate: -1 });
            return res.json(articles);
        } catch (err) {
            console.warn('DB read error, using in-memory articles fallback');
        }
    }
    res.json(inMemoryArticles);
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

// POST new article
router.post('/', auth, async (req, res) => {
    const newArtData = {
        title: req.body.title || 'Untitled Article',
        content: req.body.content || '',
        author: req.body.author || 'WOMECO Staff',
        category: req.body.category || 'News Release',
        publishDate: new Date(),
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