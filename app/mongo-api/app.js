const dotenv = require("dotenv").config();
const config = require("config");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
// const routes = require('./routes');
const appDebugger = require("debug")("app:startup");


const app = express();


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
// app.use(routes);

const port = process.env.EXPRESS_API_PORT || 3000;
if (process.env.NODE_ENV === "development") {
    appDebugger("Application:" + config.get("development.name"));
    app.use(morgan("dev"));
}

module.exports = app;