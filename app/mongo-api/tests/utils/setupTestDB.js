const dotenv = require("dotenv").config();
const config = require("config");
const app = require("./app");
const mongoose = require("mongoose");
const dbDebugger = require("debug")("app:mongodb");
const appDebugger = require("debug")("app:startup");

const setupTestDB = () => {
  beforeAll(async () => {
    //Make the connection to mongoose before running any tests
    await initMongoose();
  });

  // before running each of the test delete all the items in the collections
  //   beforeEach(async () => {
  //     await Promise.all(
  //       Object.values(mongoose.connection.collections).map(async (collection) =>
  //         collection.deleteMany()
  //       )
  //     );
  //   });

  /**
   * @TODO
   * @Josh
   * How to disconnect from our mongoDB
   */
  //After all the tests have run disconnect from db
  //   afterAll(async () => {
  //     await mongoose.disconnect();
  //   });
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
        sslCA: config.get("production.database.certificate"),
      })
      .then(() => dbDebugger("Status: connected"));
    mongoose.connection.db.listCollections().toArray(function (err, names) {
      names.forEach((Element) =>
        dbDebugger("Local DB Collections: " + Element.name)
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
    const nodeEnv = process.env.NODE_ENV;
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
    connectMongoose(uri);
  } catch (error) {
    dbDebugger(error.message);
  }
}

module.exports = setupTestDB;
