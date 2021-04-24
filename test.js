const { mongoose } = require("./config");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database opened.");
});

const Workout = require("./models/Workout");

const blah = async () => {
  const workout = await new Workout({
    day: new Date(),
    exercises: [],
  });
  console.log(workout);
};

blah();