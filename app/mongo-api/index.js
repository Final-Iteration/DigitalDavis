// Config
const dotenv = require('dotenv').config();
const config = require('config');

// Routes
const challenges = require('./routes/challenges.js')

// Debugger 
const startupDebugger = require('debug')('app:startup');
const mongodbDebugger = require('debug')('app:mongodb');


//Middleware

const helmet = require('helmet');
const morgan = require('morgan')

// Express
const express = require('express');
const app = express();

// Start
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public'));
app.use(helmet());

//Router
app.use('/api/challenges',challenges)



// NODE_ENV
const env = process.env.NODE_ENV || 'development'

if (env === 'development'){

    startupDebugger('Application Name: ' + config.get('name'))
    startupDebugger(`Morgan: enabled`);

    mongodbDebugger('Database.Host: ' + config.get('mongodb.host'))
    mongodbDebugger('Database.Name: ' + config.get('mongodb.database'))
    mongodbDebugger('Database.Collection: ' + config.get('mongodb.collection'))

    app.use(morgan('dev'));
}; 

// Server
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port ${port}`));

