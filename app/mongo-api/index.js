const app = require("./app");
const dotenv = require("dotenv").config();
const config = require("config");
const mongoose = require("mongoose");
const dbDebugger = require("debug")("app:mongodb");


if (process.env.NODE_ENV === "development") {
  dbDebugger(
    "Host: " +
      config.get("development.database.protocol") +
      config.get("development.database.host")
  );
  dbDebugger("Name: " + config.get("development.database.database"));
  dbDebugger(
    "Collection: " + config.get("development.database.collection")
  );
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
};

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
      config.get("development.database.collection"),
      challengeSchema
    );
    const challenge = new Challenge({
      name: "Simple Challenge 4",
      id: await makeUniqueID(16),
      creator: "Josh Poe",
      participants: "Josh Poe",
    });
    const result = await challenge.save();
    dbDebugger(result + "\n challenge added");
  } catch (error) {
    dbDebugger(error.message);
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
    dbDebugger(challenge);
  } catch (error) {
    dbDebugger(error.message);
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
    dbDebugger("challenge " + id + " updated.");
    dbDebugger(result);
  } catch (error) {
    dbDebugger(error.message);
  }
}

/**
 * @todo add support for iteration over key value pairs with $set operator
 * @param {string} id
 * @param {object} updatedChallenge
 * @returns
 */
async function updateChallenge_Server(id, updatedChallenge) {
  try {
    const challenge = await Challenge.findByIdAndUpdate(
      id,
      {
        $set: {
          key: "value",
        },
      },
      { new: true }
    );

    if (!challenge) return;

    const result = await challenge.save();
    dbDebugger("challenge " + id + " updated.");
    dbDebugger(result);
  } catch (error) {
    dbDebugger(error);
  }
}

const updatedChallenge = {
  name: "somestring",
  creator: "somestring else",
  tags: ["mmm", "abbs"],
};

// const uri = uriBuilder();
createChallenge();
// getChallenges();
// updateChallenge("614e1844ad88983c9574e3c8", updatedChallenge);
connectMongoose();
