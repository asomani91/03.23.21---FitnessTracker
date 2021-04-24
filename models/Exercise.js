const mongoose = require('mongoose');

const shcema = new mongoose.Schema({
    name: String,
    category: String,
    reps: Number,
    weight: Number,
    sets: Number,
});

module.exports = mongoose.model("Exercise", schema);