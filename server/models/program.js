
const mongoose = require('mongoose');

const ProgramSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Program', ProgramSchema);
