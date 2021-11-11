/* eslint-disable no-undef */
const request = require("supertest");
const httpStatus = require("http-status");
const app = require("../../../mongo-api/app");
const setupTestDB = require("../utils/setupTestDB");
const { Challenge } = require("../../models");
const getChallenge = require("../fixtures/createChallengeFunctions");
const {
  challengeOne,
  challengeTwo,
  insertChallenges,
  challengeThree,
} = require("../fixtures/challenge.fixture");
const { userOneAccessToken, userTwoAccessToken, userThreeAccessToken } = require('../fixtures/token.fixtures');
const { deleteOne } = require("../../models/challenge.model");
const testDebugger = require('debug')('app:test');

/**
 * Setup Database 
 */
setupTestDB();

describe("Challenge routes", () => {
  describe("POST /api/challenges", () => {
    let newChallenge;
    console.log('userOneAccessToken: '+ userOneAccessToken)
    beforeAll(() =>
      getChallenge().then((response) => {
        newChallenge = response;
      })
    );

    test("should return 201 and successfully create new Challenge if data is ok", async () => {
      const res = await request(app)
        .post("/api/challenges")
        .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
    
        .send(newChallenge)
        .expect(httpStatus.CREATED);

      expect(res.body).toEqual({
        id: expect.anything(),
        name: newChallenge.name,
        creator: newChallenge.creator,
        tags: newChallenge.tags,
        description: newChallenge.description,
        location: newChallenge.location,
        timestamp: new Date(newChallenge.timestamp).toISOString(),
        start_date: new Date(newChallenge.start_date).toISOString(),
        end_date: new Date(newChallenge.end_date).toISOString(),
        participants: newChallenge.participants,
      });

      const dbChallenge = await Challenge.findById(res.body.id);
      expect(dbChallenge).toBeDefined();
      expect(dbChallenge).toMatchObject({
        name: newChallenge.name,
        id: expect.anything(),
        creator: newChallenge.creator,
        tags: newChallenge.tags,
        description: newChallenge.description,
        location: newChallenge.location,
        timestamp: new Date(newChallenge.timestamp),
        start_date: newChallenge.start_date,
        end_date: newChallenge.end_date,
        participants: newChallenge.participants,
      });
    });

    test("should return 400 error if start date > end date", async () => {
      //Make newChallenge's start_date > end_date
      const endDate = new Date(newChallenge.end_date);
      endDate.setDate(endDate.getDate() + 2);
      newChallenge.start_date = endDate;

      await request(app)
        .post("/api/challenges")
        .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
    
        .send(newChallenge)
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 400 error if start date < current date", async () => {
      //Make newChallenge's start_date = current date -2
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 2);
      newChallenge.start_date = pastDate;

      await request(app)
        .post("/api/challenges")
        .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
    
        .send(newChallenge)
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 400 error if end date < current date", async () => {
      //Make newChallenge's end_date = current date -2
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 2);
      newChallenge.end_date = pastDate;

      await request(app)
        .post("/api/challenges")
        .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
    
        .send(newChallenge)
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 400 error if name length is more than 30 characters", async () => {
      newChallenge.name = "Lorem ipsum dolor sit amet, con";

      await request(app)
        .post("/api/challenges")
        .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
    
        .send(newChallenge)
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 400 error if name length is less than 5 characters", async () => {
      newChallenge.name = "Lor";

      await request(app)
        .post("/api/challenges")
        .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
    
        .send(newChallenge)
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 400 error if creator length is less than 3 characters", async () => {
      newChallenge.creator = "L";

      await request(app)
        .post("/api/challenges")
        .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
    
        .send(newChallenge)
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 400 error if creator length is more than 30 characters", async () => {
      newChallenge.creator = "Lorem ipsum dolor sit amethdubj con";

      await request(app)
        .post("/api/challenges")
        .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
         
        .send(newChallenge)
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 400 error if tags are incorrect", async () => {
      newChallenge.tags = ["NOT CORRECT", "SOCIAL"];

      await request(app)
        .post("/api/challenges")
        .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
    
        .send(newChallenge)
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 400 error if timestamp is null", async () => {
      newChallenge.timestamp = null;

      await request(app)
        .post("/api/challenges")
        .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
    
        .send(newChallenge)
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 400 error if description length is more than 150 characters", async () => {
      newChallenge.description =
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis pa";

      await request(app)
        .post("/api/challenges")
        .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
    
        .send(newChallenge)
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 400 error if summary length is more than 150 characters", async () => {
      newChallenge.summary =
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis pa";

      await request(app)
        .post("/api/challenges")
        .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
    
        .send(newChallenge)
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 400 error if location length is less than 1 characters", async () => {
      newChallenge.location = "";

      await request(app)
        .post("/api/challenges")
        .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
    
        .send(newChallenge)
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 400 error if location length is more than 50 characters", async () => {
      newChallenge.location =
        "Lorem ipsum dolor sit amet, consectetuer adipiscing";

      await request(app)
        .post("/api/challenges")
        .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
    
        .send(newChallenge)
        .expect(httpStatus.BAD_REQUEST);
    });
  }); //end of POST

  describe("GET /api/challenges", () => {
    test("should return 200 and apply the default query options", async () => {
      await insertChallenges([challengeOne, challengeTwo, challengeThree]);

      const res = await request(app)
        .get("/api/challenges")
        .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
    
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 3,
      });
      expect(res.body.results).toHaveLength(3);
      expect(res.body.results[0]).toEqual({
        id: challengeOne._id.toHexString(),
        name: challengeOne.name,
        creator: challengeOne.creator,
        tags: challengeOne.tags,
        description: challengeOne.description,
        location: challengeOne.location,
        timestamp: expect.anything(),
        start_date: new Date(challengeOne.start_date).toISOString(),
        end_date: new Date(challengeOne.end_date).toISOString(),
        participants: challengeOne.participants,
      });
      expect(res.body.results[1]).toEqual({
        id: challengeTwo._id.toHexString(),
        name: challengeTwo.name,
        creator: challengeTwo.creator,
        tags: challengeTwo.tags,
        description: challengeTwo.description,
        location: challengeTwo.location,
        timestamp: expect.anything(),
        start_date: new Date(challengeTwo.start_date).toISOString(),
        end_date: new Date(challengeTwo.end_date).toISOString(),
        participants: challengeTwo.participants,
      });
    });

    test("should correctly apply filter on name field", async () => {
      await insertChallenges([challengeOne, challengeTwo]);

      const res = await request(app)
        .get("/api/challenges")
        .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
    
        .query({ name: challengeOne.name })
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 1,
      });
      expect(res.body.results).toHaveLength(1);
      expect(res.body.results[0].id).toBe(challengeOne._id.toHexString());
    });

    test("should correctly apply filter on start_date field", async () => {
      await insertChallenges([challengeOne, challengeTwo]);

      testDebugger("\n challengeOne.start_date", challengeOne.start_date);

      const res = await request(app)
        .get("/api/challenges")
        .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
    
        .query({ start_date: challengeOne.start_date })
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 1,
      });
      expect(res.body.results).toHaveLength(1);
      expect(res.body.results[0].id).toBe(challengeOne._id.toHexString());
    });

    // eslint-disable-next-line max-len
    test("should correctly sort the returned array if descending sort param by name is specified", async () => {
      await insertChallenges([challengeOne, challengeTwo]);

      const res = await request(app)
        .get("/api/challenges")
        .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
    
        .query({ sortBy: "name:desc" })
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 2,
      });
      expect(res.body.results).toHaveLength(2);
      expect(res.body.results[0].id).toBe(challengeTwo._id.toHexString());
      expect(res.body.results[1].id).toBe(challengeOne._id.toHexString());
    });

    // eslint-disable-next-line max-len
    test("should correctly sort the returned array if descending sort param  by start date is specified", async () => {
      await insertChallenges([challengeOne, challengeTwo]);

      const res = await request(app)
        .get("/api/challenges")
        .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
    
        .query({ sortBy: "start_date:desc" })
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 2,
      });

      expect(res.body.results).toHaveLength(2);
      expect(res.body.results[0].id).toBe(challengeTwo._id.toHexString());
      expect(res.body.results[1].id).toBe(challengeOne._id.toHexString());
    });

    test("should sort returned array if ascending sort param by name specified", async () => {
      await insertChallenges([challengeOne, challengeTwo]);

      const res = await request(app)
        .get("/api/challenges")
        .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
    
        .query({ sortBy: "name:asc" })
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 2,
      });

      expect(res.body.results).toHaveLength(2);
      expect(res.body.results[0].id).toBe(challengeOne._id.toHexString());
      expect(res.body.results[1].id).toBe(challengeTwo._id.toHexString());
    });

    // eslint-disable-next-line max-len
    test("should correctly sort the returned array if ascending sort param  by start date is specified", async () => {
      await insertChallenges([challengeOne, challengeTwo]);

      const res = await request(app)
        .get("/api/challenges")
        .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
    
        .query({ sortBy: "start_date:asc" })
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 2,
      });

      expect(res.body.results).toHaveLength(2);
      expect(res.body.results[0].id).toBe(challengeOne._id.toHexString());
      expect(res.body.results[1].id).toBe(challengeTwo._id.toHexString());
    });

    // eslint-disable-next-line max-len
    test("should correctly sort the returned array if multiple sorting criteria are specified", async () => {
      await insertChallenges([challengeOne, challengeTwo]);

      const res = await request(app)
        .get("/api/challenges")
        .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
    
        .query({ sortBy: "location:desc,name:asc" })
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 2,
      });
      expect(res.body.results).toHaveLength(2);

      const expectedOrder = [challengeOne, challengeTwo].sort((a, b) => {
        if (a.location < b.location) {
          return 1;
        }
        if (a.location > b.location) {
          return -1;
        }
        return a.name < b.name ? -1 : 1;
      });

      expectedOrder.forEach((challenge, index) => {
        expect(res.body.results[index].id).toBe(challenge._id.toHexString());
      });
    });

    test("should limit returned array if limit param is specified", async () => {
      await insertChallenges([challengeOne, challengeTwo, challengeThree]);

      const res = await request(app)
        .get("/api/challenges")
        .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
        .query({ limit: 2 })
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 2,
        totalPages: 2,
        totalResults: 3,
      });
      expect(res.body.results).toHaveLength(2);
      expect(res.body.results[0].id).toBe(challengeOne._id.toHexString());
      expect(res.body.results[1].id).toBe(challengeTwo._id.toHexString());
    });

    test("should return the correct page if page and limit params are specified", async () => {
      await insertChallenges([challengeOne, challengeTwo, challengeThree]);

      const res = await request(app)
        .get("/api/challenges")
        .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
    
        .query({ page: 2, limit: 2 })
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 2,
        limit: 2,
        totalPages: 2,
        totalResults: 3,
      });
      expect(res.body.results).toHaveLength(1);
      expect(res.body.results[0].id).toBe(challengeThree._id.toHexString());
    });
  });

  describe("GET /api/challenges/:challengeId", () => {
    test("should return 200 and the challenge object if data is ok", async () => {
      await insertChallenges([challengeOne]);

      const res = await request(app)
        .get(`/api/challenges/${challengeOne._id}`)
        .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
    
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        id: expect.anything(),
        name: challengeOne.name,
        creator: challengeOne.creator,
        tags: challengeOne.tags,
        description: challengeOne.description,
        location: challengeOne.location,
        timestamp: new Date(challengeOne.timestamp).toISOString(),
        start_date: new Date(challengeOne.start_date).toISOString(),
        end_date: new Date(challengeOne.end_date).toISOString(),
        participants: challengeOne.participants,
      });

      test.skip("should return 401 error if access token is missing", async () => {
        await insertChallenges([challengeOne]);

        await request(app)
          .get(`/api/challenges/${challengeOne._id}`)
          .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
    
          .send()
          .expect(httpStatus.UNAUTHORIZED);
      });

      test("should return 400 error if challengeId is not a valid mongo id", async () => {
        await insertChallenges([challengeOne]);

        await request(app)
          .get("/api/challenges/invalidId")
          .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
    
          .send()
          .expect(httpStatus.BAD_REQUEST);
      });

      test("should return 404 error if challenge is not found", async () => {
        await insertChallenges([challengeTwo]);

        await request(app)
          .get(`/api/challenges/${challengeOne._id}`)
          .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
    
          .send()
          .expect(httpStatus.NOT_FOUND);
      });
    });

    describe("DELETE /api/challenges/:challengeId", () => {
      test("should return 204 if data is ok", async () => {
        await insertChallenges([challengeOne]);

        await request(app)
          .delete(`/api/challenges/${challengeOne._id}`)
          .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
    
          .send()
          .expect(httpStatus.NO_CONTENT);

        const dbChallenge = await Challenge.findById(challengeOne._id);
        expect(dbChallenge).toBeNull();
      });

      test.skip("should return 401 error if access token is missing", async () => {
        await insertChallenges([challengeOne]);

        await request(app)
          .delete(`/api/challenges/${challengeOne._id}`)
          .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
    
          .send()
          .expect(httpStatus.UNAUTHORIZED);
      });

      test("should return 400 error if challengeId is not a valid mongo id", async () => {
        await insertChallenges([challengeOne]);

        await request(app)
          .delete("/api/challenges/invalidId")
          .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
    
          .send()
          .expect(httpStatus.BAD_REQUEST);
      });

      test("should return 404 error if challenge already is not found", async () => {
        await insertChallenges([challengeOne]);

        await request(app)
          .delete(`/api/challenges/${challengeTwo._id}`)
          .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
    
          .send()
          .expect(httpStatus.NOT_FOUND);
      });
    });
  });
});
