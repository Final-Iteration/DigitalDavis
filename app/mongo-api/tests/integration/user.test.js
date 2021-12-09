/* eslint-disable no-undef */
const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const app = require('../../../mongo-api/app');
//Need to replace this with our own DB
const setupTestDB = require('../utils/setupTestDB');
const { User } = require('../../models');
const {
  createTokenOne,
  createUserTwo,
  createTokenTwo,
  createTokenThree,
} = require('../fixtures/createTokenFunction');

const { userOne, userTwo } = require('../fixtures/user.fixture');
const { userService } = require('../../services');

/**
 * used to setup test db
 */
setupTestDB();

describe('User routes', () => {
  describe('GET /api/users/:userId', () => {
    test('should return 200 and the user object if data is ok', async () => {
      const UserTokenArray = await createTokenOne();
      const userOneAccessTokenTest = UserTokenArray[0];
      str = JSON.stringify(userOneAccessTokenTest, null, 4);

      const UserAuthOne = UserTokenArray[1];
      str = JSON.stringify(UserAuthOne, null, 4);
      const res = await request(app)
        .get(`/api/users/${UserAuthOne._id}`)
        .set({
          Authorization: `Bearer ${userOneAccessTokenTest.access.token}`,
          ID: UserAuthOne._id,
        })
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        id: UserAuthOne._id.toHexString(),
        first_name: UserAuthOne.first_name,
        last_name: UserAuthOne.last_name,
        email: UserAuthOne.email,
        password: expect.anything(),
        job_title: UserAuthOne.job_title,
        department: UserAuthOne.department,
      });
    });

    test('should return 401 error if access token is missing', async () => {
      const UserAuthTwo = await createUserTwo();

      await request(app)
        .get(`/api/users/${UserAuthTwo._id}`)
        .send()
        .expect(httpStatus.UNAUTHORIZED);
    });

    test('should return 400 error if userId is not a valid mongo id', async () => {
      const UserTokenArray = await createTokenOne();
      const userOneAccessTokenTest = UserTokenArray[0];
      const UserAuthOne = UserTokenArray[1];

      await request(app)
        .get('/api/users/invalidId')
        .set({
          Authorization: `Bearer ${userOneAccessTokenTest.access.token}`,
          ID: UserAuthOne._id,
        })
        .send()
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return 404 error if user is not found', async () => {
      const UserTokenArray = await createTokenOne();
      const userOneAccessTokenTest = UserTokenArray[0];
      const UserAuthOne = UserTokenArray[1];

      await request(app)
        .get(`/api/users/${userTwo._id}`)
        .set({
          Authorization: `Bearer ${userOneAccessTokenTest.access.token}`,
          ID: UserAuthOne._id,
        })
        .send()
        .expect(httpStatus.NOT_FOUND);
    });
  });

  describe('DELETE /api/users/:userId', () => {
    test('should return 204 if data is ok', async () => {
      const UserTokenArray = await createTokenOne();
      const userOneAccessTokenTest = UserTokenArray[0];
      const UserAuthOne = UserTokenArray[1];

      await request(app)
        .delete(`/api/users/${UserAuthOne._id}`)
        .set({
          Authorization: `Bearer ${userOneAccessTokenTest.access.token}`,
          ID: UserAuthOne._id,
        })
        .send()
        .expect(httpStatus.NO_CONTENT);

      const dbUser = await User.findById(UserAuthOne._id);
      expect(dbUser).toBeNull();
    });

    test('should return 401 error if access token is missing', async () => {
      const result = await createUserTwo();
      const UserAuthTwo = result;
      await request(app)
        .delete(`/api/users/${UserAuthTwo._id}`)
        .send()
        .expect(httpStatus.UNAUTHORIZED);
    });

    test('should return 400 error if userId is not a valid mongo id', async () => {
      const UserTokenArray = await createTokenOne();
      const userOneAccessTokenTest = UserTokenArray[0];
      const UserAuthOne = UserTokenArray[1];

      await request(app)
        .delete('/api/users/invalidId')
        .set({
          Authorization: `Bearer ${userOneAccessTokenTest.access.token}`,
          ID: UserAuthOne._id,
        })
        .send()
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return 404 error if user already is not found', async () => {
      const UserTokenArray = await createTokenOne();
      const userOneAccessTokenTest = UserTokenArray[0];
      const UserAuthOne = UserTokenArray[1];

      await request(app)
        .delete(`/api/users/${userTwo._id}`)
        .set({
          Authorization: `Bearer ${userOneAccessTokenTest.access.token}`,
          ID: UserAuthOne._id,
        })
        .send()
        .expect(httpStatus.NOT_FOUND);
    });
  });
});
