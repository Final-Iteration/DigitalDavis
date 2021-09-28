const dotenv = require("dotenv").config();
const config = require("config");
const app = require("./app");
const mongoose = require("mongoose");
const dbDebugger = require("debug")("app:mongodb");
const appDebugger = require("debug")("app:startup");

const server = app.listen(port, () =>
  appDebugger(`API listening on port ${port}`)
);

if (process.env.NODE_ENV === "development") {
  dbDebugger("Host: " + config.get("development.database.host"));
  dbDebugger("Name: " + config.get("development.database.database"));
  dbDebugger("Collection: " + config.get("development.database.collection"));
}

/**
 *
 * @returns uri
 */
function uriBuilder() {
  const path = require("path");
  try {
    const uri =
      config.get("development.database.protocol") +
      config.get("development.database.user") +
      ":" +
      config.get("development.database.password") +
      "@" +
      config.get("development.database.host") +
      "/" +
      config.get("development.database.database") +
      "?" +
      config.get("development.database.authsource");
    return uri;
  } catch (error) {
    dbDebugger(error.message);
  }
}

async function connectMongoose() {
  try {
    await mongoose
      .connect(uriBuilder(), {
        sslCA: config.get("development.database.certificate"),
      })
      .then(() => dbDebugger("Status: connected"));
  } catch (error) {
    dbDebugger(error.message);
  }
}

const updatedChallenge = {
  name: "somestring",
  creator: "somestring else",
  tags: ["mmm", "abbs"],
};

// createChallenge();
// getChallenges();
// updateChallenge("614e1844ad88983c9574e3c8", updatedChallenge);
connectMongoose();
