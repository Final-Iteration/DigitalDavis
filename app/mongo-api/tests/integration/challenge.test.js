/* eslint-disable no-undef */
const request = require("supertest");
const faker = require("faker");
const httpStatus = require("http-status");
const app = require("../../../mongo-api/app");
//Need to replace this with our own DB
const setupTestDB = require("../utils/setupTestDB");
const { Challenge } = require("../../models");

const challengeTags = [
  "Emotional",
  "Environmental",
  "Intellectual",
  "Physical",
  "Social",
  "Spiritual",
];

/**
 * Returns the first element in the challengeTags array after the array has been shuffled
 * @param {*} array
 * @returns
 */
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array[0];
}

const {
  challengeOne,
  challengeTwo,
  insertChallenges,
  challengeThree,
} = require("../fixtures/challenge.fixture");
//JWT Tokens for testing
// const { challengeOneAccessToken, adminAccessToken } = require('../fixtures/token.fixture');

//Need to createa a connection to the testing database before running any tests
setupTestDB();

describe("Challenge routes", () => {
  describe("POST /api/challenges", () => {
    let newChallenge;

    beforeEach(() => {
      newChallenge = {
        name: "Challenge Name",
        creator: "Sharon",
        tags: ["Emotional"],
        start_date: "2021-10-19",
        end_date: "2022-01-05",
        description: "jump 2000, million-times.",
        location: "Davis,Ca",
        participants: ["Sharon"],
      };
    });

    test("should return 201 and successfully create new Challenge if data is ok", async () => {
      newChallenge = {
        name: "Challenge Name",
        creator: "Sharon",
        tags: ["Emotional"],
        start_date: "2021-10-19",
        end_date: "2022-01-05",
        description: "jump 2000, million-times.",
        location: "Davis,Ca",
        participants: ["Sharon"],
      };

      const res = await request(app)
        .post("/api/challenges")
        .send(newChallenge)
        .expect(httpStatus.CREATED);

      expect(res.body).toEqual({
        id: expect.anything(),
        name: newChallenge.name,
        creator: newChallenge.creator,
        tags: newChallenge.tags,
        description: newChallenge.description,
        location: newChallenge.location,
        timestamp: expect.anything(),
        start_date: expect.anything(),
        end_date: expect.anything(),
        participants: newChallenge.participants,
      });

      const dbChallenge = await Challenge.findById(res.body.id);
      expect(dbChallenge).toBeDefined();
      expect(dbChallenge).toMatchObject({
        name: newChallenge.name,
        creator: newChallenge.creator,
        tags: newChallenge.tags,
        description: newChallenge.description,
        location: newChallenge.location,
        // timestamp: newChallenge.timestamp,
        // start_date: newChallenge.start_date,
        // end_date: newChallenge.end_date,
        participants: newChallenge.participants,
      });
    });

    test("should return 400 error if name is already used", async () => {
      await insertChallenges([challengeOne]);
      newChallenge.name = challengeOne.name;

      await request(app)
        .post("/api/challenges")
        .send(newChallenge)
        .expect(httpStatus.BAD_REQUEST);
    });

    /**
     * @TODO modify this function and check if start date > end date returns 400
     */
    // test("should return 400 error if name is already used", async () => {
    //   await insertChallenges([challengeOne]);
    //   newChallenge.name = challengeOne.name;

    //   await request(app)
    //     .post("/api/challenges")
    //     .send(newChallenge)
    //     .expect(httpStatus.BAD_REQUEST);
    // });
  });
});

//   test("should return 400 error if  name length is more than 30 characters", async () => {
//     newChallenge.name = "Lorem ipsum dolor sit amet, con";

//     await request(app)
//       .post("/api/challenges")
//       .send(newChallenge)
//       .expect(httpStatus.BAD_REQUEST);
//   });
// });

// describe("GET /api/challenges", () => {
//   test("should return 200 and apply the default query options", async () => {
//     await insertChallenges([challengeOne, challengeTwo]);

//     const res = await request(app)
//       .get("/api/challenges")
//       .send()
//       .expect(httpStatus.OK);

//     expect(res.body).toEqual({
//       results: expect.any(Array),
//       page: 1,
//       limit: 10,
//       totalPages: 1,
//       totalResults: 2,
//     });
//     expect(res.body.results).toHaveLength(2);
//     expect(res.body.results[0]).toEqual({
//       id: challengeOne._id.toHexString(),
//       name: challengeOne.name,
//       creator: challengeOne.creator,
//       tags: challengeOne.tags,
//       description: challengeOne.description,
//       location: challengeOne.location,
//       timestamp: challengeOne.timestamp,
//       start_date: challengeOne.start_date,
//       end_date: challengeOne.end_date,
//       participants: challengeOne.participants,
//     });
//   });

//   test("should correctly apply filter on first name field", async () => {
//     await insertChallenges([challengeOne, challengeTwo]);

//     const res = await request(app)
//       .get("/api/challenges")
//       .query({ name: challengeOne.name })
//       .send()
//       .expect(httpStatus.OK);

//     expect(res.body).toEqual({
//       results: expect.any(Array),
//       page: 1,
//       limit: 10,
//       totalPages: 1,
//       totalResults: 2,
//     });
//     expect(res.body.results).toHaveLength(2);
//     expect(res.body.results[0].id).toBe(challengeOne._id.toHexString());
//   });

//   /**
//    * @TODO add a check for date sorting
//    */

//   // eslint-disable-next-line max-len
//   test("should correctly sort the returned array if descending sort param  by name is specified", async () => {
//     await insertChallenges([challengeOne, challengeTwo]);

//     const res = await request(app)
//       .get("/api/challenges")
//       .query({ sortBy: "name:desc" })
//       .send()
//       .expect(httpStatus.OK);

//     expect(res.body).toEqual({
//       results: expect.any(Array),
//       page: 1,
//       limit: 10,
//       totalPages: 1,
//       totalResults: 2,
//     });
//     expect(res.body.results).toHaveLength(2);
//     expect(res.body.results[0].id).toBe(challengeTwo._id.toHexString());
//     expect(res.body.results[1].id).toBe(challengeOne._id.toHexString());
//   });

//   test("should sort returned array if ascending sort param by name specified", async () => {
//     await insertChallenges([challengeOne, challengeTwo]);

//     const res = await request(app)
//       .get("/api/challenges")
//       .query({ sortBy: "name:asc" })
//       .send()
//       .expect(httpStatus.OK);

//     expect(res.body).toEqual({
//       results: expect.any(Array),
//       page: 1,
//       limit: 10,
//       totalPages: 1,
//       totalResults: 2,
//     });
//     expect(res.body.results).toHaveLength(2);
//     expect(res.body.results[0].id).toBe(challengeOne._id.toHexString());
//     expect(res.body.results[1].id).toBe(challengeTwo._id.toHexString());
//   });

//   test("should correctly sort the returned array if multiple sorting criteria are specified", async () => {
//     await insertChallenges([challengeOne, challengeTwo]);

//     const res = await request(app)
//       .get("/api/challenges")
//       .query({ sortBy: "email:desc,name:asc" })
//       .send()
//       .expect(httpStatus.OK);

//     expect(res.body).toEqual({
//       results: expect.any(Array),
//       page: 1,
//       limit: 10,
//       totalPages: 1,
//       totalResults: 2,
//     });
//     expect(res.body.results).toHaveLength(2);

//     const expectedOrder = [challengeOne, challengeTwo].sort((a, b) => {
//       if (a.email < b.email) {
//         return 1;
//       }
//       if (a.email > b.email) {
//         return -1;
//       }
//       return a.name < b.name ? -1 : 1;
//     });

//     expectedOrder.forEach((challenge, index) => {
//       expect(res.body.results[index].id).toBe(challenge._id.toHexString());
//     });
//   });

//   test("should limit returned array if limit param is specified", async () => {
//     await insertChallenges([challengeOne, challengeTwo, challengeThree]);

//     const res = await request(app)
//       .get("/api/challenges")
//       .query({ limit: 2 })
//       .send()
//       .expect(httpStatus.OK);

//     expect(res.body).toEqual({
//       results: expect.any(Array),
//       page: 1,
//       limit: 2,
//       totalPages: 2,
//       totalResults: 3,
//     });
//     expect(res.body.results).toHaveLength(2);
//     expect(res.body.results[0].id).toBe(challengeOne._id.toHexString());
//     expect(res.body.results[1].id).toBe(challengeTwo._id.toHexString());
//   });

//   test("should return the correct page if page and limit params are specified", async () => {
//     await insertChallenges([challengeOne, challengeTwo, challengeThree]);

//     const res = await request(app)
//       .get("/api/challenges")
//       .query({ page: 2, limit: 2 })
//       .send()
//       .expect(httpStatus.OK);

//     expect(res.body).toEqual({
//       results: expect.any(Array),
//       page: 2,
//       limit: 2,
//       totalPages: 2,
//       totalResults: 3,
//     });
//     expect(res.body.results).toHaveLength(1);
//     expect(res.body.results[0].id).toBe(challengeThree._id.toHexString());
//   });
// });

// describe("GET /api/challenges/:challengeId", () => {
//   test("should return 200 and the challenge object if data is ok", async () => {
//     await insertChallenges([challengeOne]);

//     const res = await request(app)
//       .get(`/api/challenges/${challengeOne._id}`)
//       .send()
//       .expect(httpStatus.OK);

//     expect(res.body).toEqual({
//       id: challengeOne._id.toHexString(),
//       name: challengeOne.name,
//       last_name: challengeOne.last_name,
//       email: challengeOne.email,
//       job_title: challengeOne.job_title,
//       department: challengeOne.department,
//     });
//   });

//   // test("should return 401 error if access token is missing", async () => {
//   //   await insertChallenges([challengeOne]);

//   //   await request(app)
//   //     .get(`/api/challenges/${challengeOne._id}`)
//   //     .send()
//   //     .expect(httpStatus.UNAUTHORIZED);
//   // });

//   test("should return 400 error if challengeId is not a valid mongo id", async () => {
//     await insertChallenges([challengeOne]);

//     await request(app)
//       .get("/api/challenges/invalidId")
//       .send()
//       .expect(httpStatus.BAD_REQUEST);
//   });

//   test("should return 404 error if challenge is not found", async () => {
//     await insertChallenges([challengeTwo]);

//     await request(app)
//       .get(`/api/challenges/${challengeOne._id}`)
//       .send()
//       .expect(httpStatus.NOT_FOUND);
//   });
// });

// describe("DELETE /api/challenges/:challengeId", () => {
//   test("should return 204 if data is ok", async () => {
//     await insertChallenges([challengeOne]);

//     await request(app)
//       .delete(`/api/challenges/${challengeOne._id}`)
//       .send()
//       .expect(httpStatus.NO_CONTENT);

//     const dbChallenge = await Challenge.findById(challengeOne._id);
//     expect(dbChallenge).toBeNull();
//   });

//   // test("should return 401 error if access token is missing", async () => {
//   //   await insertChallenges([challengeOne]);

//   //   await request(app)
//   //     .delete(`/api/challenges/${challengeOne._id}`)
//   //     .send()
//   //     .expect(httpStatus.UNAUTHORIZED);
//   // });

//   test("should return 400 error if challengeId is not a valid mongo id", async () => {
//     await insertChallenges([challengeOne]);

//     await request(app)
//       .delete("/api/challenges/invalidId")
//       .send()
//       .expect(httpStatus.BAD_REQUEST);
//   });

//   test("should return 404 error if challenge already is not found", async () => {
//     await insertChallenges([challengeOne]);

//     await request(app)
//       .delete(`/api/challenges/${challengeTwo._id}`)
//       .send()
//       .expect(httpStatus.NOT_FOUND);
//   });
// });
// });
