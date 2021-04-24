const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  day: Date,
  exercises: [],
});

module.exports = mongoose.model("Workout", schema);
