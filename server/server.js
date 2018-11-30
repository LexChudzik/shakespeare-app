
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const playRouter = require('./routes/play.router');
const productionRouter = require('./routes/production.router');
const tmdbRouter = require('./routes/tmdb.router');
const viewRouter = require('./routes/viewing.router');
//const historyRouter = require('./routes/history.router');
const listRouter = require('./routes/list.router');
const detailRouter = require('./routes/detail.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/play', playRouter);
app.use('/api/production', productionRouter);
app.use('/api/tmdb', tmdbRouter);
app.use('/api/view', viewRouter);
//app.use('/api/history', historyRouter);
app.use('/api/list', listRouter);
app.use('/api/detail', detailRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
