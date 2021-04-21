const express = require('express');
const router = express.Router();
const { Workout } = require('../models');


router.get('/', function (req, res, next) {
    Workout.find({}, (err, data) => {
        if (err) {
            console.log(err);
            return res.json({ message: "Some error occurred" }).status(500);
        }
        return res.json(data).status(200);
    });
});
router.post('/', function (req, res, next) {
    const exercise = {
        day: new Date().setDate(new Date().getDate()),
        exercises: [

        ]
    }
    Workout.create(exercise, (err, data) => {
        if (err) {
            console.log(err);
            return res.json({ message: "Some error occurred" }).status(500);
        }
        return res.json(data).status(200);
    });
});
router.put('/:id', async (req, res, next) => {
    const workout = await Workout.findOne({ _id: req.params.id });
    if (workout) {
        workout.exercises.push(req.body);
        await workout.save();
        return res.json({ success: true }).status(200);
    }
    else {
        return res.json({ message: "Not found" }).status(400);
    }
});
router.get('/range', async (req, res, next) => {
    const d = new Date();
    const timestamp = d.setDate(d.getDate() - 7);
    const query = [
        {
            '$match': {
                'day': { '$gt': timestamp }
            }
        },
        {
            '$addFields': {
                "totalDuration": {
                    $reduce: {
                        input: "$exercises",
                        initialValue: 0,
                        in: { $sum: ["$$value", "$$this.duration"] }
                    }
                }
            }
        }
    ]
    Workout.aggregate(query, (err, data) => {
        if (err) {
            console.log(err);
            return res.json({ message: "Some error occurred" }).status(500);
        }
        return res.json(data).status(200);
    });
});
module.exports = router;
