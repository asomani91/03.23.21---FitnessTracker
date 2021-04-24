require("dotenv").config();
const express = require("express");
const path = require("path");
const logger = require("morgan");
const workoutRouter = require("./routes/api");
const app = express();
const port = process.env.PORT || 3000;

const mongoose = require("mongoose");

const Exercise = require("./models/Exercise");

const URL = "mongodb+srv://root:Dolphins519@cluster0.ewptw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// Connect to Database
mongoose.connect(URL, { useNewUrlParser: true }, () =>
  console.log("Connected to DB! ✅ ")
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/workouts", workoutRouter);
app.get("/exercise", (req, res) => {
  const filePath = path.join(__dirname, "public", "exercise.html");
  res.sendFile(filePath);
});

app.get("/stats", (req, res) => {
  const filePath = path.join(__dirname, "public", "stats.html");
  res.sendFile(filePath);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
