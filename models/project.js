const { Schema, model } = require('mongoose');

const projectSchema = Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: 'default.png'
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Project', projectSchema, 'projects');