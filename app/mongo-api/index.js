const dotenv = require('dotenv').config();
const config = require('config');
const app = require('./app');
const mongoose = require('mongoose');
const dbDebugger = require('debug')('app:mongodb');
const appDebugger = require('debug')('app:startup');

function initServer() {
  const port = process.env.EXPRESS_API_PORT;
  const server = app.listen(port, () =>
    appDebugger(`API listening on port ${port}`)
  );
}

/**
 *
 * @param {*} nodeEnv
 * @returns
 */
function uriBuilder(nodeEnv) {
  var uri = '';
  try {
    if (nodeEnv === 'production') {
      uri =
        config.get(`${nodeEnv}.database.protocol`) +
        config.get(`${nodeEnv}.database.user`) +
        ':' +
        config.get(`${nodeEnv}.database.password`) +
        '@' +
        config.get(`${nodeEnv}.database.host`) +
        '/' +
        config.get(`${nodeEnv}.database.name`) +
        '?' +
        config.get(`${nodeEnv}.database.authsource`);
    } else {
      uri =
        config.get(`${nodeEnv}.database.protocol`) +
        config.get(`${nodeEnv}.database.host`) +
        ':' +
        config.get(`${nodeEnv}.database.port`) +
        '/' +
        config.get(`${nodeEnv}.database.name`);
    }
    return uri;
  } catch (error) {
    dbDebugger('uriBuilder: ' + error.message);
  }
}

/**
 * @TODO - find how to use default env vars for certificate passing
 * @param {*} uri
 */
async function connectMongoose(uri) {
  try {
    await mongoose
      .connect(uri, {
        sslCA: config.get(`${build_config}.database.certificate`),
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
 */
async function initMongoose() {
  try {
    if (build_config != 'production') {
      dbDebugger('Host: ' + config.get(`${build_config}.database.host`));
      dbDebugger('Name: ' + config.get(`${build_config}.database.name`));
      dbDebugger(
        'Collection: ' + config.get(`${build_config}.database.collection`)
      );
    }
    const uri = uriBuilder(build_config);
    dbDebugger(`Connection to Mongoose on ${uri}`);
    return connectMongoose(uri);
  } catch (error) {
    dbDebugger(error.message);
  }
}

const build_config = process.env.NODE_ENV;

appDebugger('Build config = ' + build_config);
initServer();
initMongoose();
