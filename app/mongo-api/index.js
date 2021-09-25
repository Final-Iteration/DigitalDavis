/**
 * Config
 */
const dotenv = require("dotenv").config();
const config = require("config");

/**
 * Routes
 */
const challenges = require("./routes/challenges.js");
const users = require("./routes/users.js");

/**
 * Logger
 */
const startupDebugger = require("debug")("app:startup");
const mongodbDebugger = require("debug")("app:mongodb");

/**
 * Middleware
 */
const helmet = require("helmet");
const morgan = require("morgan");

/**
 * Express
 */
const express = require("express");
const app = express();

/**
 * API
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());

/**
 * Router
 */
app.use("/api/challenges", challenges);
app.use("/api/users", users);

// Debugger
const env = process.env.NODE_ENV || "Development";

if (env === "Development") {
  startupDebugger("Application Name: " + config.get("Development.name"));
  startupDebugger(`Morgan: enabled`);

  mongodbDebugger(
    "Database.Host: " +
      config.get("Development.database.protocol") +
      config.get("Development.database.host")
  );
  mongodbDebugger(
    "Database.Name: " + config.get("Development.database.database")
  );
  mongodbDebugger(
    "Database.Collection: " + config.get("Development.database.collection")
  );
  app.use(morgan("dev"));
}

// Mongoose
const mongoose = require("mongoose");

function uriBuilder() {
  const path = require("path");
  try {
    const uri = (
      config.get("Development.database.protocol") +
      config.get("Development.database.user") +
      ":" +
      config.get("Development.database.password") +
      "@" +
      config.get("Development.database.host") +
      "/" +
      config.get("Development.database.database") +
      "?" +
      config.get("Development.database.authsource")
    );
    return uri;
  } catch (error) {
    mongodbDebugger(error);
  }
}

async function connectMongoose() {
  try {
    await mongoose
      .connect(uriBuilder(), { sslCA: config.get("Development.database.certificate")})
      .then(() => mongodbDebugger("Status: connected"));
  } catch (error) {
    mongodbDebugger("Error " + error);
  }
}

/**
 * Schema
 */
const challengeSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: false,
  },
  summary: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  timestamps: {
    type: Date,
    required: true,
    default: Date.now,
  },
  start_date: {
    type: Date,
    required: false,
  },
  end_date: {
    type: Date,
    required: false,
  },
  participants: {
    type: [String],
    required: true,
  },
});

/**
 * Challenge Functions
 */
async function createChallenge() {
  try {
    const Challenge = mongoose.model(
      config.get("Development.database.collection"),
      challengeSchema
    );
    const challenge = new Challenge({
      name: "Simple Challenge 2",
      id: await makeUniqueID(16),
      creator: "Josh Poe",
      participants: "Josh Poe",
    });
    const result = await challenge.save();
    mongodbDebugger(result + "added to database");
  } catch (error) {
    mongodbDebugger("error" + error);
  }
}

async function makeUniqueID(length) {
  var result = "";
  var characters = "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

async function getChallenges() {
  try {
    const challenge = await Challenge.find().limit(10).sort({ name: 1 });
    mongodbDebugger(challenge);
  } catch (error) {
    mongodbDebugger("error" + error);
  }
}

/**
 *
 * @param {string} id
 * @param {object} updatedChallenge
 * @returns
 */
async function updateChallenge_Client(id, updatedChallenge) {
  try {
    const challenge = await Challenge.findById(id);
    if (!challenge) return;

    for (const [key, value] of Object.entries(updatedChallenge)) {
      challenge.set({
        key: value,
      });
    }

    const result = await challenge.save();
    mongodbDebugger("challenge " + id + " updated.");
    mongodbDebugger(result);
  } catch (error) {
    mongodbDebugger("error" + error);
  }
}

const updatedChallenge = {
  name: "somestring",
  creator: "somestring else",
  tags: ["mmm", "abbs"],
};

// const uri = uriBuilder(); 
// createChallenge();
// getChallenges();
// updateChallenge("614e1844ad88983c9574e3c8", updatedChallenge);
connectMongoose()

// Server
const port = process.env.EXPRESS_API_PORT || 3000;
app.listen(port, () => startupDebugger(`listening on port ${port}`));
