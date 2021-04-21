require('dotenv').config()
const express = require('express');
const path = require('path');
const logger = require('morgan');
const workoutRouter = require('./routes/workout');
const app = express()
const port = 3000;

const { mongoose } = require('./config')
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Database opened.')
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/workouts', workoutRouter);
app.get('/exercise', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'exercise.html');
    res.sendFile(filePath);
});
app.get('/stats', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'stats.html');
    res.sendFile(filePath);
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});


