/* eslint-disable no-undef */
const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../../mongo-api/app');
const setupTestDB = require('../utils/setupTestDB');
const { Challenge } = require('../../models');
const getChallenge = require('../fixtures/createChallengeFunctions');
const {
  challengeOne,
  challengeTwo,
  insertChallenges,
  insertChallengesSkipValidation,
  insertChallengesParticipateUser,
  challengeThree,
} = require('../fixtures/challenge.fixture');
const { createTokenOne } = require('../fixtures/createTokenFunction');
const { deleteOne } = require('../../models/challenge.model');
const testDebugger = require('debug')('app:test');

setupTestDB();

describe('Challenge routes', () => {
  describe('GET /all', () => {
    test('should return 200 and return ALL the challenges', async () => {
      const UserTokenArray = await createTokenOne();
      const userOneAccessTokenTest = UserTokenArray[0];
      const UserAuthOne = UserTokenArray[1];
      challengeOne.creator = UserAuthOne._id; //update challenge one to include the creator's id
      await insertChallenges([challengeTwo, challengeThree]);
      await insertChallengesParticipateUser(
        [challengeTwo, challengeThree],
        UserAuthOne._id
      );
      await insertChallengesSkipValidation(
        [challengeOne],
        ['2021-10-28T00:00:00.000Z'],
        ['2021-10-30T00:00:00.000Z']
      ); //makes challenge one in the past and skips validation so this is possible
      await insertChallengesParticipateUser([challengeOne], UserAuthOne._id);

      const res = await request(app)
        .get(`/api/challenges/all`)
        .set({
          Authorization: `Bearer ${userOneAccessTokenTest.access.token}`,
          ID: UserAuthOne._id,
        })
        .send()
        .expect(httpStatus.OK);

      expect(res.body[0]).toEqual({
        id: challengeTwo._id.toHexString(),
        name: challengeTwo.name,
        creator: challengeTwo.creator.toHexString(),
        tags: challengeTwo.tags,
        description: challengeTwo.description,
        location: challengeTwo.location,
        unsplashurl: challengeTwo.unsplashurl,
        participants: expect.anything(),
        timestamp: expect.anything(),
        start_date: new Date(challengeTwo.start_date).toISOString(),
        end_date: new Date(challengeTwo.end_date).toISOString(),
      });
      expect(res.body[1]).toEqual({
        id: challengeThree._id.toHexString(),
        name: challengeThree.name,
        creator: challengeThree.creator.toHexString(),
        tags: challengeThree.tags,
        description: challengeThree.description,
        location: challengeThree.location,
        participants: expect.anything(),
        unsplashurl: challengeThree.unsplashurl,
        timestamp: expect.anything(),
        start_date: new Date(challengeThree.start_date).toISOString(),
        end_date: new Date(challengeThree.end_date).toISOString(),
      });
      expect(res.body[2]).toEqual({
        id: challengeOne._id.toHexString(),
        name: challengeOne.name,
        creator: challengeOne.creator.toHexString(),
        tags: challengeOne.tags,
        description: challengeOne.description,
        location: challengeOne.location,
        unsplashurl: challengeOne.unsplashurl,
        participants: expect.anything(),
        timestamp: expect.anything(),
        start_date: expect.anything(),
        end_date: expect.anything(),
      });
    });
  });

  describe('GET /past', () => {
    test('should return 200 and return the past challenges', async () => {
      const UserTokenArray = await createTokenOne();
      const userOneAccessTokenTest = UserTokenArray[0];
      const UserAuthOne = UserTokenArray[1];
      challengeOne.creator = UserAuthOne._id; //update challenge one to include the creator's id
      challengeTwo.creator = UserAuthOne._id; //update challenge one to include the creator's id
      challengeThree.creator = UserAuthOne._id; //update challenge one to include the creator's id

      await insertChallenges([challengeTwo, challengeThree]);
      await insertChallengesParticipateUser(
        [challengeTwo, challengeThree],
        UserAuthOne._id
      );
      await insertChallengesSkipValidation(
        [challengeOne],
        ['2021-10-28T00:00:00.000Z'],
        ['2021-10-30T00:00:00.000Z']
      );
      await insertChallengesParticipateUser([challengeOne], UserAuthOne._id);

      const res = await request(app)
        .get(`/api/challenges/past`)
        .set({
          Authorization: `Bearer ${userOneAccessTokenTest.access.token}`,
          ID: UserAuthOne._id,
        })
        .send()
        .expect(httpStatus.OK);

      expect(res.body[0]).toEqual({
        id: challengeOne._id.toHexString(),
        name: challengeOne.name,
        creator: challengeOne.creator.toHexString(),
        tags: challengeOne.tags,
        description: challengeOne.description,
        location: challengeOne.location,
        unsplashurl: challengeOne.unsplashurl,
        participants: expect.anything(),
        timestamp: expect.anything(),
        start_date: '2021-10-28T00:00:00.000Z',
        end_date: '2021-10-30T00:00:00.000Z',
      });
    });
  });

  describe('GET /active', () => {
    test('should return 200 and return the active challenges', async () => {
      const UserTokenArray = await createTokenOne();
      const userOneAccessTokenTest = UserTokenArray[0];
      const UserAuthOne = UserTokenArray[1];
      challengeOne.creator = UserAuthOne._id; //update challenge one to include the creator's id
      challengeTwo.creator = UserAuthOne._id; //update challenge one to include the creator's id
      challengeThree.creator = UserAuthOne._id; //update challenge one to include the creator's id
      await insertChallengesSkipValidation(
        [challengeOne, challengeTwo, challengeThree],
        [
          '2021-10-28T00:00:00.000Z',
          '2021-10-28T00:00:00.000Z',
          '2021-10-28T00:00:00.000Z',
        ],
        [
          '2021-11-01T00:00:00.000Z',
          challengeTwo.end_date,
          challengeThree.end_date,
        ]
      );
      await insertChallengesParticipateUser(
        [challengeOne, challengeTwo, challengeThree],
        UserAuthOne._id
      );

      const res = await request(app)
        .get(`/api/challenges/active`)
        .set({
          Authorization: `Bearer ${userOneAccessTokenTest.access.token}`,
          ID: UserAuthOne._id,
        })
        .send()
        .expect(httpStatus.OK);

      expect(res.body[0]).toEqual({
        id: challengeTwo._id.toHexString(),
        name: challengeTwo.name,
        creator: challengeTwo.creator.toHexString(),
        tags: challengeTwo.tags,
        description: challengeTwo.description,
        location: challengeTwo.location,
        unsplashurl: challengeTwo.unsplashurl,
        participants: expect.anything(),
        timestamp: expect.anything(),
        start_date: '2021-10-28T00:00:00.000Z',
        end_date: new Date(challengeTwo.end_date).toISOString(),
      });
      expect(res.body[1]).toEqual({
        id: challengeThree._id.toHexString(),
        name: challengeThree.name,
        creator: challengeThree.creator.toHexString(),
        tags: challengeThree.tags,
        description: challengeThree.description,
        location: challengeThree.location,
        participants: expect.anything(),
        unsplashurl: challengeThree.unsplashurl,
        timestamp: expect.anything(),
        start_date: '2021-10-28T00:00:00.000Z',
        end_date: new Date(challengeThree.end_date).toISOString(),
      });
    });
  });

  describe('PUT /participate/:Id', () => {
    test("should return 200 and successfully update the Challenge's participants if data is ok", async () => {
      const UserTokenArray = await createTokenOne();
      const userOneAccessTokenTest = UserTokenArray[0];
      const UserAuthOne = UserTokenArray[1];
      challengeOne.creator = UserAuthOne._id; //update challenge one to include the creator's id
      await insertChallenges([challengeOne]);

      const res = await request(app)
        .put(`/api/challenges/participate/${challengeOne.creator}`)
        .set({
          Authorization: `Bearer ${userOneAccessTokenTest.access.token}`,
          ID: UserAuthOne._id,
        })
        .send() //only the creator id is sent in the header
        .expect(httpStatus.OK);
    });
  });

  describe('GET /participate/:Id', () => {
    test("should return 200 and successfully retrieve the Challenge's participants if data is ok", async () => {
      const UserTokenArray = await createTokenOne();
      const userOneAccessTokenTest = UserTokenArray[0];
      const UserAuthOne = UserTokenArray[1];
      challengeOne.creator = UserAuthOne._id; //update challenge one to include the creator's id
      await insertChallenges([challengeOne]); //this wont work because the creator wont be created

      const res = await request(app)
        .get(`/api/challenges/participate/${challengeOne._id}`)
        .set({
          Authorization: `Bearer ${userOneAccessTokenTest.access.token}`,
          ID: UserAuthOne._id,
        })
        .send() //only the creator id is sent in the header
        .expect(httpStatus.OK);
    });
  });

  describe('PUT /unparticipate/:Id', () => {
    test("should return 200 and successfully update the Challenge's participants if data is ok", async () => {
      const UserTokenArray = await createTokenOne();
      const userOneAccessTokenTest = UserTokenArray[0];
      const UserAuthOne = UserTokenArray[1];
      challengeOne.creator = UserAuthOne._id; //update challenge one to include the creator's id
      await insertChallenges([challengeOne]); //this wont work because the creator wont be created

      const res = await request(app)
        .put(`/api/challenges/unparticipate/${challengeOne.creator}`)
        .set({
          Authorization: `Bearer ${userOneAccessTokenTest.access.token}`,
          ID: UserAuthOne._id,
        })
        .send() //only the creator id is sent in the header
        .expect(httpStatus.OK);
    });
  });

  describe('POST /api/challenges', () => {
    let newChallenge;

    beforeAll(() => {
      getChallenge().then((response) => {
        newChallenge = response;
      });
    });

    test('should return 201 and successfully create new Challenge if data is ok', async () => {
      const UserTokenArray = await createTokenOne();
      const userOneAccessTokenTest = UserTokenArray[0];
      const UserAuthOne = UserTokenArray[1];

      const res = await request(app)
        .post('/api/challenges')
        .set({
          Authorization: `Bearer ${userOneAccessTokenTest.access.token}`,
          ID: UserAuthOne._id,
        })
        .send(newChallenge)
        .expect(httpStatus.CREATED);

      expect(res.body).toEqual({
        id: expect.anything(),
        name: newChallenge.name,
        creator: expect.anything(),
        tags: newChallenge.tags,
        description: newChallenge.description,
        location: newChallenge.location,
        unsplashurl: newChallenge.unsplashurl,
        participants: expect.anything(),
        timestamp: new Date(newChallenge.timestamp).toISOString(),
        start_date: new Date(newChallenge.start_date).toISOString(),
        end_date: new Date(newChallenge.end_date).toISOString(),
      });

      const dbChallenge = await Challenge.findById(res.body.id);
      expect(dbChallenge).toBeDefined();
      expect(dbChallenge).toMatchObject({
        name: newChallenge.name,
        id: expect.anything(),
        creator: expect.anything(),
        tags: newChallenge.tags,
        description: newChallenge.description,
        location: newChallenge.location,
        unsplashurl: newChallenge.unsplashurl,
        participants: expect.anything(),
        timestamp: new Date(newChallenge.timestamp),
        start_date: newChallenge.start_date,
        end_date: newChallenge.end_date,
      });
    });

    test('should return 400 error if start date > end date', async () => {
      const UserTokenArray = await createTokenOne();
      const userOneAccessTokenTest = UserTokenArray[0];
      const UserAuthOne = UserTokenArray[1];
      //Make newChallenge's start_date > end_date
      const endDate = new Date(newChallenge.end_date);
      endDate.setDate(endDate.getDate() + 2);
      newChallenge.start_date = endDate;

      await request(app)
        .post('/api/challenges')
        .set({
          Authorization: `Bearer ${userOneAccessTokenTest.access.token}`,
          ID: UserAuthOne._id,
        })
        .send(newChallenge)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 error if start date < current date', async () => {
      const UserTokenArray = await createTokenOne();
      const userOneAccessTokenTest = UserTokenArray[0];
      const UserAuthOne = UserTokenArray[1];
      //Make newChallenge's start_date = current date -2
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 2);
      newChallenge.start_date = pastDate;

      await request(app)
        .post('/api/challenges')
        .set({
          Authorization: `Bearer ${userOneAccessTokenTest.access.token}`,
          ID: UserAuthOne._id,
        })
        .send(newChallenge)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 error if end date < current date', async () => {
      const UserTokenArray = await createTokenOne();
      const userOneAccessTokenTest = UserTokenArray[0];
      const UserAuthOne = UserTokenArray[1];
      //Make newChallenge's end_date = current date -2
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 2);
      newChallenge.end_date = pastDate;

      await request(app)
        .post('/api/challenges')
        .set({
          Authorization: `Bearer ${userOneAccessTokenTest.access.token}`,
          ID: UserAuthOne._id,
        })
        .send(newChallenge)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 error if name length is more than 30 characters', async () => {
      const UserTokenArray = await createTokenOne();
      const userOneAccessTokenTest = UserTokenArray[0];
      const UserAuthOne = UserTokenArray[1];
      newChallenge.name = 'Lorem ipsum dolor sit amet, con';

      await request(app)
        .post('/api/challenges')
        .set({
          Authorization: `Bearer ${userOneAccessTokenTest.access.token}`,
          ID: UserAuthOne._id,
        })
        .send(newChallenge)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 error if name length is less than 5 characters', async () => {
      const UserTokenArray = await createTokenOne();
      const userOneAccessTokenTest = UserTokenArray[0];
      const UserAuthOne = UserTokenArray[1];
      newChallenge.name = 'Lor';

      await request(app)
        .post('/api/challenges')
        .set({
          Authorization: `Bearer ${userOneAccessTokenTest.access.token}`,
          ID: UserAuthOne._id,
        })
        .send(newChallenge)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 error if creator length is less than 3 characters', async () => {
      const UserTokenArray = await createTokenOne();
      const userOneAccessTokenTest = UserTokenArray[0];
      const UserAuthOne = UserTokenArray[1];
      newChallenge.creator = 'L';

      await request(app)
        .post('/api/challenges')
        .set({
          Authorization: `Bearer ${userOneAccessTokenTest.access.token}`,
          ID: UserAuthOne._id,
        })
        .send(newChallenge)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 error if creator length is more than 30 characters', async () => {
      const UserTokenArray = await createTokenOne();
      const userOneAccessTokenTest = UserTokenArray[0];
      const UserAuthOne = UserTokenArray[1];
      newChallenge.creator = 'Lorem ipsum dolor sit amethdubj con';

      await request(app)
        .post('/api/challenges')
        .set({
          Authorization: `Bearer ${userOneAccessTokenTest.access.token}`,
          ID: UserAuthOne._id,
        })

        .send(newChallenge)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 error if tags are incorrect', async () => {
      const UserTokenArray = await createTokenOne();
      const userOneAccessTokenTest = UserTokenArray[0];
      const UserAuthOne = UserTokenArray[1];
      newChallenge.tags = ['NOT CORRECT', 'SOCIAL'];

      await request(app)
        .post('/api/challenges')
        .set({
          Authorization: `Bearer ${userOneAccessTokenTest.access.token}`,
          ID: UserAuthOne._id,
        })

        .send(newChallenge)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 error if timestamp is null', async () => {
      const UserTokenArray = await createTokenOne();
      const userOneAccessTokenTest = UserTokenArray[0];
      const UserAuthOne = UserTokenArray[1];
      newChallenge.timestamp = null;

      await request(app)
        .post('/api/challenges')
        .set({
          Authorization: `Bearer ${userOneAccessTokenTest.access.token}`,
          ID: UserAuthOne._id,
        })

        .send(newChallenge)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 error if description length is more than 250 characters', async () => {
      const UserTokenArray = await createTokenOne();
      const userOneAccessTokenTest = UserTokenArray[0];
      const UserAuthOne = UserTokenArray[1];
      newChallenge.description =
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium.';

      await request(app)
        .post('/api/challenges')
        .set({
          Authorization: `Bearer ${userOneAccessTokenTest.access.token}`,
          ID: UserAuthOne._id,
        })
        .send(newChallenge)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 error if summary length is more than 150 characters', async () => {
      const UserTokenArray = await createTokenOne();
      const userOneAccessTokenTest = UserTokenArray[0];
      const UserAuthOne = UserTokenArray[1];
      newChallenge.summary =
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis pa';
      await request(app)
        .post('/api/challenges')
        .set({
          Authorization: `Bearer ${userOneAccessTokenTest.access.token}`,
          ID: UserAuthOne._id,
        })
        .send(newChallenge)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 error if location length is less than 1 characters', async () => {
      const UserTokenArray = await createTokenOne();
      const userOneAccessTokenTest = UserTokenArray[0];
      const UserAuthOne = UserTokenArray[1];
      newChallenge.location = '';

      await request(app)
        .post('/api/challenges')
        .set({
          Authorization: `Bearer ${userOneAccessTokenTest.access.token}`,
          ID: UserAuthOne._id,
        })
        .send(newChallenge)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 error if location length is more than 50 characters', async () => {
      const UserTokenArray = await createTokenOne();
      const userOneAccessTokenTest = UserTokenArray[0];
      const UserAuthOne = UserTokenArray[1];
      newChallenge.location =
        'Lorem ipsum dolor sit amet, consectetuer adipiscing';

      await request(app)
        .post('/api/challenges')
        .set({
          Authorization: `Bearer ${userOneAccessTokenTest.access.token}`,
          ID: UserAuthOne._id,
        })
        .send(newChallenge)
        .expect(httpStatus.BAD_REQUEST);
    });
  }); //end of POST

  describe('GET /api/challenges', () => {
    test('should return 200 and apply the default query options', async () => {
      const UserTokenArray = await createTokenOne();
      const userOneAccessTokenTest = UserTokenArray[0];
      const UserAuthOne = UserTokenArray[1];
      await insertChallenges([challengeOne, challengeTwo, challengeThree]);

      const res = await request(app)
        .get('/api/challenges')
        .set({
          Authorization: `Bearer ${userOneAccessTokenTest.access.token}`,
          ID: UserAuthOne._id,
        })
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
        creator: challengeOne.creator.toHexString(),
        tags: challengeOne.tags,
        description: challengeOne.description,
        location: challengeOne.location,
        unsplashurl: challengeOne.unsplashurl,
        participants: expect.anything(),
        timestamp: expect.anything(),
        start_date: new Date(challengeOne.start_date).toISOString(),
        end_date: new Date(challengeOne.end_date).toISOString(),
      });
      expect(res.body.results[1]).toEqual({
        id: challengeTwo._id.toHexString(),
        name: challengeTwo.name,
        creator: challengeTwo.creator.toHexString(),
        tags: challengeTwo.tags,
        description: challengeTwo.description,
        location: challengeTwo.location,
        participants: expect.anything(),
        unsplashurl: challengeTwo.unsplashurl,
        timestamp: expect.anything(),
        start_date: new Date(challengeTwo.start_date).toISOString(),
        end_date: new Date(challengeTwo.end_date).toISOString(),
      });
    });

    test('should correctly apply filter on name field', async () => {
      const UserTokenArray = await createTokenOne();
      const userOneAccessTokenTest = UserTokenArray[0];
      const UserAuthOne = UserTokenArray[1];
      await insertChallenges([challengeOne, challengeTwo]);

      const res = await request(app)
        .get('/api/challenges')
        .set({
          Authorization: `Bearer ${userOneAccessTokenTest.access.token}`,
          ID: UserAuthOne._id,
        })
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

    test('should correctly apply filter on start_date field', async () => {
      const UserTokenArray = await createTokenOne();
      const userOneAccessTokenTest = UserTokenArray[0];
      const UserAuthOne = UserTokenArray[1];
      await insertChallenges([challengeOne, challengeTwo]);

      testDebugger('\n challengeOne.start_date', challengeOne.start_date);

      const res = await request(app)
        .get('/api/challenges')
        .set({
          Authorization: `Bearer ${userOneAccessTokenTest.access.token}`,
          ID: UserAuthOne._id,
        })
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
    test('should correctly sort the returned array if descending sort param by name is specified', async () => {
      const UserTokenArray = await createTokenOne();
      const userOneAccessTokenTest = UserTokenArray[0];
      const UserAuthOne = UserTokenArray[1];
      await insertChallenges([challengeOne, challengeTwo]);

      const res = await request(app)
        .get('/api/challenges')
        .set({
          Authorization: `Bearer ${userOneAccessTokenTest.access.token}`,
          ID: UserAuthOne._id,
        })
        .query({ sortBy: 'name:desc' })
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
    test('should correctly sort the returned array if descending sort param  by start date is specified', async () => {
      const UserTokenArray = await createTokenOne();
      const userOneAccessTokenTest = UserTokenArray[0];
      const UserAuthOne = UserTokenArray[1];
      await insertChallenges([challengeOne, challengeTwo]);

      const res = await request(app)
        .get('/api/challenges')
        .set({
          Authorization: `Bearer ${userOneAccessTokenTest.access.token}`,
          ID: UserAuthOne._id,
        })
        .query({ sortBy: 'start_date:desc' })
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

    test('should sort returned array if ascending sort param by name specified', async () => {
      const UserTokenArray = await createTokenOne();
      const userOneAccessTokenTest = UserTokenArray[0];
      const UserAuthOne = UserTokenArray[1];
      await insertChallenges([challengeOne, challengeTwo]);

      const res = await request(app)
        .get('/api/challenges')
        .set({
          Authorization: `Bearer ${userOneAccessTokenTest.access.token}`,
          ID: UserAuthOne._id,
        })
        .query({ sortBy: 'name:asc' })
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
    test('should correctly sort the returned array if ascending sort param  by start date is specified', async () => {
      const UserTokenArray = await createTokenOne();
      const userOneAccessTokenTest = UserTokenArray[0];
      const UserAuthOne = UserTokenArray[1];
      await insertChallenges([challengeOne, challengeTwo]);

      const res = await request(app)
        .get('/api/challenges')
        .set({
          Authorization: `Bearer ${userOneAccessTokenTest.access.token}`,
          ID: UserAuthOne._id,
        })

        .query({ sortBy: 'start_date:asc' })
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
    test('should correctly sort the returned array if multiple sorting criteria are specified', async () => {
      const UserTokenArray = await createTokenOne();
      const userOneAccessTokenTest = UserTokenArray[0];
      const UserAuthOne = UserTokenArray[1];
      await insertChallenges([challengeOne, challengeTwo]);

      const res = await request(app)
        .get('/api/challenges')
        .set({
          Authorization: `Bearer ${userOneAccessTokenTest.access.token}`,
          ID: UserAuthOne._id,
        })
        .query({ sortBy: 'location:desc,name:asc' })
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

    test('should limit returned array if limit param is specified', async () => {
      const UserTokenArray = await createTokenOne();
      const userOneAccessTokenTest = UserTokenArray[0];
      const UserAuthOne = UserTokenArray[1];
      await insertChallenges([challengeOne, challengeTwo, challengeThree]);

      const res = await request(app)
        .get('/api/challenges')
        .set({
          Authorization: `Bearer ${userOneAccessTokenTest.access.token}`,
          ID: UserAuthOne._id,
        })
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

    test('should return the correct page if page and limit params are specified', async () => {
      const UserTokenArray = await createTokenOne();
      const userOneAccessTokenTest = UserTokenArray[0];
      const UserAuthOne = UserTokenArray[1];
      await insertChallenges([challengeOne, challengeTwo, challengeThree]);

      const res = await request(app)
        .get('/api/challenges')
        .set({
          Authorization: `Bearer ${userOneAccessTokenTest.access.token}`,
          ID: UserAuthOne._id,
        })
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

  describe('GET /api/challenges/:challengeId', () => {
    test('should return 200 and the challenge object if data is ok', async () => {
      const UserTokenArray = await createTokenOne();
      const userOneAccessTokenTest = UserTokenArray[0];
      const UserAuthOne = UserTokenArray[1];
      await insertChallenges([challengeOne]);

      const res = await request(app)
        .get(`/api/challenges/${challengeOne._id}`)
        .set({
          Authorization: `Bearer ${userOneAccessTokenTest.access.token}`,
          ID: UserAuthOne._id,
        })
        .send()
        .expect(httpStatus.OK);

      expect(res.body.challengeInfo).toEqual({
        id: expect.anything(),
        name: challengeOne.name,
        creator: expect.anything(),
        tags: challengeOne.tags,
        description: challengeOne.description,
        location: challengeOne.location,
        unsplashurl: challengeOne.unsplashurl,
        timestamp: new Date(challengeOne.timestamp).toISOString(),
        start_date: new Date(challengeOne.start_date).toISOString(),
        end_date: new Date(challengeOne.end_date).toISOString(),
        participants: expect.anything(),
      });
    });

    test('should return 401 error if access token is missing', async () => {
      const UserTokenArray = await createTokenOne();
      const userOneAccessTokenTest = UserTokenArray[0];
      const UserAuthOne = UserTokenArray[1];
      await insertChallenges([challengeOne]);

      await request(app)
        .get(`/api/challenges/${challengeOne._id}`)
        .send()
        .expect(httpStatus.UNAUTHORIZED);
    });

    test('should return 400 error if challengeId is not a valid mongo id', async () => {
      const UserTokenArray = await createTokenOne();
      const userOneAccessTokenTest = UserTokenArray[0];
      const UserAuthOne = UserTokenArray[1];
      await insertChallenges([challengeOne]);

      await request(app)
        .get('/api/challenges/invalidId')
        .set({
          Authorization: `Bearer ${userOneAccessTokenTest.access.token}`,
          ID: UserAuthOne._id,
        })
        .send()
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe('DELETE /api/challenges/:challengeId', () => {
    test('should return 204 if data is ok', async () => {
      const UserTokenArray = await createTokenOne();
      const userOneAccessTokenTest = UserTokenArray[0];
      const UserAuthOne = UserTokenArray[1];
      challengeOne.creator = UserAuthOne._id; //update challenge one to include the creator's id
      await insertChallenges([challengeOne]);

      await request(app)
        .delete(`/api/challenges/${challengeOne._id}`)
        .set({
          Authorization: `Bearer ${userOneAccessTokenTest.access.token}`,
          ID: UserAuthOne._id,
        })
        .send()
        .expect(httpStatus.NO_CONTENT);

      const dbChallenge = await Challenge.findById(challengeOne._id);
      expect(dbChallenge).toBeNull();
    });

    test('should return 401 error if access token is missing', async () => {
      const UserTokenArray = await createTokenOne();
      const userOneAccessTokenTest = UserTokenArray[0];
      const UserAuthOne = UserTokenArray[1];
      await insertChallenges([challengeOne]);

      await request(app)
        .delete(`/api/challenges/${challengeOne._id}`)
        .send()
        .expect(httpStatus.UNAUTHORIZED);
    });

    test('should return 400 error if challengeId is not a valid mongo id', async () => {
      const UserTokenArray = await createTokenOne();
      const userOneAccessTokenTest = UserTokenArray[0];
      const UserAuthOne = UserTokenArray[1];
      await insertChallenges([challengeOne]);

      await request(app)
        .delete('/api/challenges/invalidId')
        .set({
          Authorization: `Bearer ${userOneAccessTokenTest.access.token}`,
          ID: UserAuthOne._id,
        })
        .send()
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return 404 error if challenge already is not found', async () => {
      const UserTokenArray = await createTokenOne();
      const userOneAccessTokenTest = UserTokenArray[0];
      const UserAuthOne = UserTokenArray[1];
      await insertChallenges([challengeOne]);

      await request(app)
        .delete(`/api/challenges/${challengeTwo._id}`)
        .set({
          Authorization: `Bearer ${userOneAccessTokenTest.access.token}`,
          ID: UserAuthOne._id,
        })
        .send()
        .expect(httpStatus.NOT_FOUND);
    });
  });
});
