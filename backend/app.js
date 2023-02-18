const express = require('express');
// const morgan = require('morgan');
// const cors = require('cors');

const app = express();

// app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// app.use(morgan('dev'));
// app.use(morgan('combined', { stream: httpLogStream }));

// simple route
app.get('/', (req, res) => {
    res.status(200).send({message: "API working fine!"});
});

// routes
require('./routers/authRouter.js')(app);
require('./routers/userRouter.js')(app);

app.use(
    (err, req, res, next) => {
        res.status(err.statusCode || 500).send({message: err.message});
        next();
    }
);

module.exports = app;





