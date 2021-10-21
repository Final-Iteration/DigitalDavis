const dotenv = require("dotenv").config({ path: '../../.env.dev' });
const config = require("config");
const mongoose = require("mongoose");
const app = require('../../app')
const dbDebugger = require("debug")("app:mongodb");

/**
 * Make the connection to mongoose before running any tests
 */
const setupTestDB = () => {
  beforeAll(async () => {
    initMongoose();
  });

  // before running each of the test delete all the items in the collections
  beforeEach(async () => {
    await Promise.all(
      Object.values(mongoose.connection.collections).map(async (collection) =>
        collection.deleteMany()
      )
    );
  });

  //After all the tests have run disconnect from db
  afterAll(async () => {
    await mongoose.disconnect();
  });
};

/**
 *
 * @param {*} nodeEnv
 * @returns
 */
 function uriBuilder(nodeEnv) {
  var uri = "";
  try {
    if (nodeEnv === "production") {
      uri =
        config.get(`${nodeEnv}.database.protocol`) +
        config.get(`${nodeEnv}.database.user`) +
        ":" +
        config.get(`${nodeEnv}.database.password`) +
        "@" +
        config.get(`${nodeEnv}.database.host`) +
        "/" +
        config.get(`${nodeEnv}.database.name`) +
        "?" +
        config.get(`${nodeEnv}.database.authsource`);
    } else if (nodeEnv === "development") {
      uri =
        config.get(`${nodeEnv}.database.protocol`) +
        config.get(`${nodeEnv}.database.host`) +
        ":" +
        config.get(`${nodeEnv}.database.port`) +
        "/" +
        config.get(`${nodeEnv}.database.name`);
    }
    return uri;
  } catch (error) {
    dbDebugger("uriBuilder: " + error.message);
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
        sslCA: config.get(`${nodeEnv}.database.certificate`),
      })
      .then(() => dbDebugger("Status: connected"));
  } catch (error) {
    dbDebugger(error.message);
  }
}

/**
 *
 */
 async function initMongoose() {
  try {
    if (nodeEnv === "development") {
      dbDebugger("Host: " + config.get(`${nodeEnv}.database.host`));
      dbDebugger("Name: " + config.get(`${nodeEnv}.database.name`));
      dbDebugger("Collection: " + config.get(`${nodeEnv}.database.collection`));
    } else if (nodeEnv === "common") {
      dbDebugger("Host: " + config.get(`${nodeEnv}.database.host`));
      dbDebugger("Name: " + config.get(`${nodeEnv}.database.name`));
      dbDebugger(
        "Collection : " + config.get(`${nodeEnv}.database.collection`)
      );
    }
    const uri = uriBuilder(nodeEnv);
    dbDebugger(`Connection to Mongoose on ${uri}`);
    return connectMongoose(uri);
  } catch (error) {
    dbDebugger(error.message);
  }
}

function initServer() {
  const port = process.env.EXPRESS_API_PORT;
  app.listen(port, () => {});
}

const nodeEnv = process.env.NODE_ENV;
initMongoose();
initServer();
module.exports = setupTestDB;
