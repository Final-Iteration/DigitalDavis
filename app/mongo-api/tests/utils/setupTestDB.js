const mongoose = require('mongoose');

const connection_string = process.env.DB_CON_STR;

/**
 * Make the connection to mongoose before running any tests
 */
const setupTestDB = () => {
  beforeAll(async () => {
    connectMongoose(connection_string);
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
 * @TODO - find how to use default env vars for certificate passing
 * @param {*} uri
 */
async function connectMongoose(uri) {
  try {
    await mongoose
      .connect(uri, {
        ssl: false,
      })
      .then(() => console.log('Status: connected'));
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = setupTestDB;
