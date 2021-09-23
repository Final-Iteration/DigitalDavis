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

const challengeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
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
    default: Date.now,
  }
});


async function createChallenge(){
    try {
        const Challenge = mongoose.model("Challenge", challengeSchema);
        const challenge = new Challenge({
        name: "Test Challenge",
        id: await makeid(16),
        creator: "Josh Poe",  
        });
        const result = await challenge.save();
        mongodbDebugger(result + 'added to database');
    } catch (err) {
        mongodbDebugger('err' + err);
    }
}

async function makeid(length) {
  var result = "";
  var characters =
    "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// createChallenge();

// Server
const port = process.env.PORT || 3000;
app.listen(port, () => startupDebugger(`listening on port ${port}`));
