// Config
const dotenv = require("dotenv").config();
const config = require("config");

// Routes
const challenges = require("./routes/challenges.js");
const users = require("./routes/users.js");

// Debugger
const startupDebugger = require("debug")("app:startup");
const mongodbDebugger = require("debug")("app:mongodb");

//Middleware
const helmet = require("helmet");
const morgan = require("morgan");

// Express
const express = require("express");
const app = express();

// Start
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());

//Router
app.use("/api/challenges", challenges);
app.use("/api/users", users);

// Debugger
const env = process.env.NODE_ENV || "development";

if (env === "development") {
  startupDebugger("Application Name: " + config.get("name"));
  startupDebugger(`Morgan: enabled`);

  mongodbDebugger(
    "Database.Host: " +
      config.get("mongodb-local-dev.protocol") +
      config.get("mongodb-local-dev.host")
  );
  mongodbDebugger("Database.Name: " + config.get("mongodb-local-dev.database"));
  mongodbDebugger(
    "Database.Collection: " + config.get("mongodb-local-dev.collection")
  );
  app.use(morgan("dev"));
}

// Mongoose
const mongoose = require("mongoose");
const { object } = require("joi");
mongoose
  .connect(
    config.get("mongodb-local-dev.protocol") +
      config.get("mongodb-local-dev.host") +
      ":" +
      config.get("mongodb-local-dev.port") +
      "/" +
      config.get("mongodb-local-dev.database")
  )
  .then(() => mongodbDebugger("Status: connected"));

// Schema
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

// Model
const Challenge = mongoose.model(
  config.get("mongodb-local-dev.collection"),
  challengeSchema
);

// Functions
async function createChallenge() {
  try {
    const Challenge = mongoose.model(
      config.get("mongodb-local-dev.collection"),
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
    const challenge = await Challenge.find()
      .limit(10)
      .sort({ name: 1 })
      .select({ name: 1, tags: 1 });
    mongodbDebugger(challenge);
  } catch (error) {
    mongodbDebugger("error" + error);
  }
}

createChallenge();
getChallenges();

// Server
const port = process.env.PORT || 3000;
app.listen(port, () => startupDebugger(`listening on port ${port}`));
