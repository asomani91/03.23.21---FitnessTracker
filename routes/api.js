const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout");

router.get("/", async function (req, res, next) {
  let workouts = await Workout.find({});
  console.log(workouts);
  res.json(workouts);
});

router.post("/", function (req, res, next) {
  const exercise = {
    day: new Date().setDate(new Date().getDate()),
    exercises: [],
  };
  Workout.create(exercise, (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ message: "Some error occurred" }).status(500);
    }
    return res.json(data).status(200);
  });
});
router.put("/:id", async (req, res, next) => {
  console.log(req.params.id);
  const workout = await Workout.findOne({ _id: req.params.id });
  if (workout) {
    workout.exercises.push(req.body);
    await workout.save();
    return res.json({ success: true }).status(200);
  } else {
    return res.json({ message: "Not found" }).status(400);
  }
});
router.get("/range", async (req, res, next) => {
  const d = new Date();
  const timestamp = d.setDate(d.getDate() - 7);
  const query = [
    {
      $match: {
        day: { $gt: timestamp },
      },
    },
    {
      $addFields: {
        totalDuration: {
          $reduce: {
            input: "$exercises",
            initialValue: 0,
            in: { $sum: ["$$value", "$$this.duration"] },
          },
        },
      },
    },
  ];
  Workout.aggregate(query, (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ message: "Some error occurred" }).status(500);
    }
    return res.json(data).status(200);
  });
});

router.get("/workouts", async function (req, res, next) {
  let workouts = await Workout.find({});
  console.log(workouts);
  res.json(workouts);
});
router.put("/workouts", async function (req, res, next) {
  let workouts = await Workout.findOne({ _id: req.params.id });
  
  console.log(workouts);
  res.json(workouts);
});
module.exports = router;
