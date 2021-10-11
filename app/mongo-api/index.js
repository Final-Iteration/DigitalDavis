const dotenv = require('dotenv').config();
const config = require('config');
const app = require('./app');
const mongoose = require('mongoose');
const dbDebugger = require('debug')('app:mongodb');
const appDebugger = require('debug')('app:startup');

const port = process.env.EXPRESS_API_PORT;
const server = app.listen(port, () =>
  appDebugger(`API listening on port ${port}`)
);

/**
 *
 * @returns uri
 */
function uriBuilder() {
  const path = require('path');
  try {
    const uri =
      config.get('development.database.protocol') +
      config.get('development.database.user') +
      ':' +
      config.get('development.database.password') +
      '@' +
      config.get('development.database.host') +
      '/' +
      config.get('development.database.name') +
      '?' +
      config.get('development.database.authsource');
    return uri;
  } catch (error) {
    dbDebugger(error.message);
  }
}

async function connectMongoose() {
  try {
    await mongoose
      .connect(uriBuilder(), {
        sslCA: config.get('development.database.certificate'),
      })
      .then(() => dbDebugger('Status: connected'));
  } catch (error) {
    dbDebugger(error.message);
  }
}

/**
 * needs to be assigned to const var that can be opened and closed
 */
async function connectMongooseLocal() {
  try {
    await mongoose
      .connect(uriBuilder(), {
        sslCA: config.get('development.database.certificate'),
      })
      .then(() => dbDebugger('Status: connected'));
    mongoose.connection.db.listCollections().toArray(function (err, names) {
      names.forEach((Element) =>
        dbDebugger('Local DB Collections: ' + Element.name)
      );
    });
  } catch (error) {
    dbDebugger(error.message);
  }
}

/**
 *
 * @returns uri
 */
function uriBuilderLocal() {
  const path = require('path');
  try {
    const uri =
      config.get('local.database.protocol') +
      config.get('local.database.host') +
      ':' +
      config.get('local.database.port') +
      '/' +
      config.get('local.database.name');
    return uri;
  } catch (error) {
    dbDebugger(error.message);
  }
}

if (process.env.NODE_ENV === 'development') {
  dbDebugger('Host: ' + config.get('development.database.host'));
  dbDebugger('Name: ' + config.get('development.database.name'));
  dbDebugger('Collection: ' + config.get('development.database.collection'));
  const uri = uriBuilder();
  connectMongoose(uri);
}

if (process.env.NODE_ENV === 'local') {
  dbDebugger('Host: ' + config.get('local.database.host'));
  dbDebugger('Name: ' + config.get('local.database.name'));
  dbDebugger('Collections : ' + config.get('local.database.collection'));
  const uri = uriBuilderLocal();
  connectMongooseLocal(uri);
}
