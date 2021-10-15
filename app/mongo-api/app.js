const dotenv = require('dotenv').config();
const config = require('config');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
// const compression = require('compression');
// const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const { errorConverter, errorHandler } = require('./middleware/error');
const challengesRoute = require('./routes/challenge.route');
const appDebugger = require('debug')('app:startup');

const app = express();

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

// gzip compression
// app.use(compression());

// enable cors
// app.use(cors());
// app.options('*', cors());

// jwt authentication
// app.use(passport.initialize());
// passport.use('jwt', jwtStrategy);

// limit repeated failed requests to auth endpoints
// if (config.env === 'production') {
//   app.use('/v1/auth', authLimiter);
// }

// api routes
app.use('/api/challenges', challengesRoute);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
