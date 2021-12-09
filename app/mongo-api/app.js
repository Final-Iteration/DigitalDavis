const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const { errorConverter, errorHandler } = require('./middleware/error');
const challengesRoute = require('./routes/challenge.route');
const usersRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');
const passport = require('passport');
const { jwtStrategy } = require('./config/passport');
const appDebugger = require('debug')('app:startup');

const app = express();

app.use(
  cors({
    origin: '*',
  })
);

// set Morgan
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// api routes
app.use('/api/challenges', challengesRoute);
app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute);

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
