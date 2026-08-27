const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Program = require('../models/program');
const auth = require('../middleware/auth');

// In-memory fallback cache
let inMemoryPrograms = [
    {
        _id: 'p1',
        title: 'Global Teacher Fellowship 2026',
        category: 'Teacher Empowerment',
        region: 'Global',
        description: 'An executive 12-month program providing educator grants, international policy mentorship, and access to modern AI classroom software.',
        impact: '2,500 Educators Selected Annually',
        budget: '$5.0 Million',
        status: 'Active Applications Open',
    },
    {
        _id: 'p2',
        title: 'AI Ethics in Primary Education Initiative',
        category: 'Technology & Policy',
        region: 'North America & Europe',
        description: 'Collaborative curriculum development project creating age-appropriate guidelines for artificial intelligence literacy and critical thinking.',
        impact: '450 Partner School Districts',
        budget: '$3.2 Million',
        status: 'In Implementation',
    },
    {
        _id: 'p3',
        title: 'Rural STEM & Connectivity Grant',
        category: 'Global Access',
        region: 'Sub-Saharan Africa & Asia-Pacific',
        description: 'Deploying solar-powered satellite internet nodes, STEM lab equipment, and open-source learning textbooks to rural schools.',
        impact: '1,200 Rural Centers',
        budget: '$4.5 Million',
        status: 'Scaling Phase',
    },
    {
        _id: 'p4',
        title: 'Youth Climate Stewardship & Leadership',
        category: 'Curriculum Reform',
        region: 'Latin America & Middle East',
        description: 'Project-based education framework empowering secondary school students to design local environmental sustainability solutions.',
        impact: '180,000 Student Participants',
        budget: '$2.1 Million',
        status: 'Active Applications Open',
    },
];

const isDbConnected = () => mongoose.connection && mongoose.connection.readyState === 1;

// GET all programs
router.get('/', async (req, res) => {
    if (isDbConnected()) {
        try {
            const programs = await Program.find();
            return res.json(programs);
        } catch (err) {
            console.warn('DB read error, using in-memory programs fallback');
        }
    }
    res.json(inMemoryPrograms);
});

// GET single program
router.get('/:id', async (req, res) => {
    if (isDbConnected()) {
        try {
            const program = await Program.findById(req.params.id);
            if (program) return res.json(program);
        } catch (err) {}
    }
    const item = inMemoryPrograms.find(p => p._id === req.params.id);
    if (!item) return res.status(404).json({ message: 'Cannot find program' });
    res.json(item);
});

// POST new program
router.post('/', auth, async (req, res) => {
    const newProgData = {
        title: req.body.title || 'Untitled Program',
        description: req.body.description || '',
        category: req.body.category || 'General Initiative',
        region: req.body.region || 'Global',
        budget: req.body.budget || '$1.0M',
        impact: req.body.impact || 'Global Reach',
        status: req.body.status || 'Active',
    };

    if (isDbConnected()) {
        try {
            const program = new Program(newProgData);
            const saved = await program.save();
            inMemoryPrograms.unshift(saved);
            return res.status(201).json(saved);
        } catch (err) {
            console.warn('DB write error, saving to in-memory store');
        }
    }

    const created = {
        _id: 'prog-' + Date.now(),
        ...newProgData,
    };
    inMemoryPrograms.unshift(created);
    res.status(201).json(created);
});

// PUT update program
router.put('/:id', auth, async (req, res) => {
    if (isDbConnected()) {
        try {
            const program = await Program.findById(req.params.id);
            if (program) {
                if (req.body.title != null) program.title = req.body.title;
                if (req.body.description != null) program.description = req.body.description;
                if (req.body.category != null) program.category = req.body.category;
                if (req.body.region != null) program.region = req.body.region;
                if (req.body.budget != null) program.budget = req.body.budget;
                if (req.body.impact != null) program.impact = req.body.impact;
                if (req.body.status != null) program.status = req.body.status;
                const updated = await program.save();
                return res.json(updated);
            }
        } catch (err) {}
    }

    const index = inMemoryPrograms.findIndex(p => p._id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Program not found' });

    inMemoryPrograms[index] = {
        ...inMemoryPrograms[index],
        ...req.body,
        _id: req.params.id,
    };
    res.json(inMemoryPrograms[index]);
});

// DELETE program
router.delete('/:id', auth, async (req, res) => {
    if (isDbConnected()) {
        try {
            const program = await Program.findById(req.params.id);
            if (program) {
                await program.deleteOne();
            }
        } catch (err) {}
    }

    inMemoryPrograms = inMemoryPrograms.filter(p => p._id !== req.params.id);
    res.json({ message: 'Deleted Program successfully' });
});

module.exports = router;
