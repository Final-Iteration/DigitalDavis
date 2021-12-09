const dotenv = require('dotenv').config();
const config = require('./config/config');
const app = require('./app');
const mongoose = require('mongoose');
const dbDebugger = require('debug')('app:mongodb');
const appDebugger = require('debug')('app:startup');

let server;

function initServer(port = 3000) {
  server = app.listen(port, () => appDebugger(`API listening on port ${port}`));
}

/**
 * @TODO - find how to use default env vars for certificate passing
 * @param {*} uri
 */
async function connectMongoose(
  url = 'mongodb://localhost:27017',
  certificate = false
) {
  try {
    await mongoose
      .connect(url, {
        sslCA: certificate,
      })
      .then(() => dbDebugger('Status: connected'));
    if (config.env != 'production') {
      mongoose.connection.db.listCollections().toArray(function (err, names) {
        names.forEach((Element) => dbDebugger('Collections: ' + Element.name));
      });
    }
  } catch (error) {
    dbDebugger(error.message);
  }
}

const exitHandler = () => {
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  if (server) {
    server.close();
  }
});

connectMongoose(config.mongoose.url, config.mongoose.certificate);
initServer(config.port);

module.exports = { connectMongoose, initServer };
