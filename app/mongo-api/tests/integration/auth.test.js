const request = require('supertest');
const httpStatus = require('http-status');
const faker = require('faker');
const app = require('../../../mongo-api/app');
const setupTestDB = require('../utils/setupTestDB');
const testDebugger = require('debug')('app:test');
const { User } = require('../../models');
const tokenService = require('../../services/token.services');
const createUser = require('../../services/user.services');
const {
  userAuthOne,
  userAuthTwo,
  userAuthThree,
  insertAuthUsers,
} = require('../fixtures/userAuth.fixture');
const {
  createTokenOne,
  createTokenTwo,
  createTokenThree,
} = require('../fixtures/createTokenFunction');
setupTestDB();

describe('Auth routes', () => {
  describe('POST /api/auth/register', () => {
    let newUser = {
      first_name: faker.name.findName(),
      last_name: faker.name.findName(),
      password: '1234567abd',
      email: faker.internet.email().toLowerCase(),
      job_title: [`${faker.name.jobTitle()}`],
      department: faker.commerce.department(),
    };
    test('REGISTER: should return 201 and successfully create new user and register if data is ok', async () => {
      newUser = userAuthOne;

      const res = await request(app)
        .post('/api/auth/register')
        .send(newUser)
        .expect(httpStatus.CREATED);

      expect(res.body.user).toEqual({
        id: expect.anything(),
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        password: expect.anything(),
        job_title: newUser.job_title,
        department: newUser.department,
      });

      expect(res.body.tokens.access.token).not.toEqual(null);

      const dbUser = await User.findById(res.body.user.id);
      expect(dbUser).toBeDefined();
      expect(dbUser).toMatchObject({
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        password: expect.anything(),
        email: newUser.email,
        job_title: newUser.job_title,
        department: newUser.department,
      });
    });
  });

  describe('POST /api/auth', () => {
    test('LOGIN: should return 200 and login the user', async () => {
      await insertAuthUsers([userAuthOne]);
      const res = await request(app)
        .post('/api/auth/login')
        .send(userAuthOne)
        .expect(httpStatus.OK);

      expect(res.body.user).toEqual({
        id: expect.anything(),
        first_name: userAuthOne.first_name,
        last_name: userAuthOne.last_name,
        email: userAuthOne.email,
        password: expect.anything(),
        job_title: userAuthOne.job_title,
        department: userAuthOne.department,
      });

      expect(res.body.tokens.access.token).not.toEqual(null);

      const dbUser = await User.findById(res.body.user.id);
      expect(dbUser).toBeDefined();
      expect(dbUser).toMatchObject({
        first_name: userAuthOne.first_name,
        last_name: userAuthOne.last_name,
        password: expect.anything(),
        email: userAuthOne.email,
        job_title: userAuthOne.job_title,
        department: userAuthOne.department,
      });
    });

    test('LOGOUT: should return 204 and logout the user', async () => {
      const UserTokenArray = await createTokenOne();
      const userOneAccessTokenTest = UserTokenArray[0];
      const UserAuthOne = UserTokenArray[1];

      const res = await request(app)
        .post('/api/auth/logout')
        .send({ refreshToken: userOneAccessTokenTest.refresh.token })
        .expect(httpStatus.NO_CONTENT);
    });
  });
}); //end of all describes
