const express = require('express'),
    cors = require('cors'),
    app = express(),
    bodyParser = require('body-parser'),
    helmet = require('helmet');

const message = require('./util/custom_msg');
const Queue = require('./util/queue');

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(helmet());

// making an in memory queue system!!
const queue = new Queue();
app.use((req, res, next) => {
    req.queue = queue;
    next();
});

app.get('/', (req, res) => res.status(200).json(message(req, res)));
app.use('/add', require('./routes/add'));
app.use('/monitor', require('./routes/monitor'));
app.use('/result', require('./routes/result'));
app.use('/jobs', require('./routes/update_jobs'));

app.use((req, res, next) => {
    const error = new Error('Invalid Request');
    res.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status = error.status || 500;
    return res.json({
        error: {
            message: error.message,
            help: message(req, res)
        }
    });
});

module.exports = app;