const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  workoutId: String,
  category: String,
  reps: Number,
  weight: Number,
  sets: Number,
});

module.exports = mongoose.model("Exercise", schema);
