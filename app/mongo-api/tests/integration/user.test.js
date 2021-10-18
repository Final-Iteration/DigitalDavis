/* eslint-disable no-undef */
const request = require("supertest");
const faker = require("faker");
const httpStatus = require("http-status");
const app = require("../../../mongo-api/app");
//Need to replace this with our own DB
const setupTestDB = require("../utils/setupTestDB");
const { User } = require("../../models");
// const { User } = require("../../models");

//These fixtures create differnt kinds of users [I don't think we need this - Sharon]
const { userOne, userTwo, insertUsers } = require("../fixtures/user.fixture");
//JWT Tokens for testing
// const { userOneAccessToken, adminAccessToken } = require('../fixtures/token.fixture');

//Need to createa a connection to the testing database before running any tests
setupTestDB();

describe("User routes", () => {
  describe("POST /api/users", () => {
    let newUser;

    beforeEach(() => {
      newUser = {
        first_name: faker.name.findName(),
        last_name: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        job_title: [`${faker.name.jobTitle()}`],
        department: faker.commerce.department(),
      };
    });

    test("should return 201 and successfully create new user if data is ok", async () => {
      const res = await request(app)
        .post("/api/users")
        .send(newUser)
        .expect(httpStatus.CREATED);

      expect(res.body).toEqual({
        id: expect.anything(),
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        job_title: newUser.job_title,
        department: newUser.department,
      });

      const dbUser = await User.findById(res.body.id);
      expect(dbUser).toBeDefined();
      expect(dbUser).toMatchObject({
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        job_title: newUser.job_title,
        department: newUser.department,
      });
    });

    test("should return 400 error if email is invalid", async () => {
      newUser.email = "invalidEmail";

      await request(app)
        .post("/api/users")
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    // test('should return 400 error if email is already used', async () => {
    //   await insertUsers([admin, userOne]);
    //   newUser.email = userOne.email;

    //   await request(app)
    //     .post("/api/users")
    //     .set('Authorization', `Bearer ${adminAccessToken}`)
    //     .send(newUser)
    //     .expect(httpStatus.BAD_REQUEST);
    // });

    test("should return 400 error if first name length is more than 30 characters", async () => {
      newUser.first_name = "Lorem ipsum dolor sit amet, con";

      await request(app)
        .post("/api/users")
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe("GET /api/users", () => {
    test("should return 200 and apply the default query options", async () => {
      await insertUsers([userOne, userTwo]);

      const res = await request(app)
        .get("/api/users")
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
      expect(res.body.results[0]).toEqual({
        id: userOne._id.toHexString(),
        first_name: userOne.first_name,
        last_name: userOne.last_name,
        email: userOne.email,
        job_title: userOne.job_title,
        department: userOne.department,
      });
    });

    test("should correctly apply filter on first name field", async () => {
      await insertUsers([userOne, userTwo]);

      const res = await request(app)
        .get("/api/users")
        .query({ first_name: userOne.first_name })
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
      expect(res.body.results[0].id).toBe(userOne._id.toHexString());
    });

    /**
     * @TODO add a check for date sorting
     */

    // eslint-disable-next-line max-len
    test("should correctly sort the returned array if descending sort param  by first_name is specified", async () => {
      await insertUsers([userOne, userTwo]);

      const res = await request(app)
        .get("/api/users")
        .query({ sortBy: "first_name:desc" })
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
      expect(res.body.results[0].id).toBe(userTwo._id.toHexString());
      expect(res.body.results[1].id).toBe(userOne._id.toHexString());
    });

    test("should sort returned array if ascending sort param by first_name specified", async () => {
      await insertUsers([userOne, userTwo]);

      const res = await request(app)
        .get("/api/users")
        .query({ sortBy: "first_name:asc" })
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
      expect(res.body.results[0].id).toBe(userOne._id.toHexString());
      expect(res.body.results[1].id).toBe(userTwo._id.toHexString());
    });

    test("should correctly sort the returned array if multiple sorting criteria are specified", async () => {
      await insertUsers([userOne, userTwo]);

      const res = await request(app)
        .get("/api/users")
        .query({ sortBy: "email:desc,first_name:asc" })
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

      const expectedOrder = [userOne, userTwo].sort((a, b) => {
        if (a.email < b.email) {
          return 1;
        }
        if (a.email > b.email) {
          return -1;
        }
        return a.first_name < b.first_name ? -1 : 1;
      });

      expectedOrder.forEach((user, index) => {
        expect(res.body.results[index].id).toBe(user._id.toHexString());
      });
    });

    // test('should limit returned array if limit param is specified', async () => {
    //   await insertUsers([userOne, userTwo, admin]);

    //   const res = await request(app)
    //     .get("/api/users")
    //
    //     .query({ limit: 2 })
    //     .send()
    //     .expect(httpStatus.OK);

    //   expect(res.body).toEqual({
    //     results: expect.any(Array),
    //     page: 1,
    //     limit: 2,
    //     totalPages: 2,
    //     totalResults: 3,
    //   });
    //   expect(res.body.results).toHaveLength(2);
    //   expect(res.body.results[0].id).toBe(userOne._id.toHexString());
    //   expect(res.body.results[1].id).toBe(userTwo._id.toHexString());
    // });

    // test('should return the correct page if page and limit params are specified', async () => {
    //   await insertUsers([userOne, userTwo, admin]);

    //   const res = await request(app)
    //     .get("/api/users")
    //     .query({ page: 2, limit: 2 })
    //     .send()
    //     .expect(httpStatus.OK);

    //   expect(res.body).toEqual({
    //     results: expect.any(Array),
    //     page: 2,
    //     limit: 2,
    //     totalPages: 2,
    //     totalResults: 3,
    //   });
    //   expect(res.body.results).toHaveLength(1);
    //   expect(res.body.results[0].id).toBe(admin._id.toHexString());
    // });
  });

  // describe('GET /v1/users/:userId', () => {
  //   test('should return 200 and the user object if data is ok', async () => {
  //     await insertUsers([userOne]);

  //     const res = await request(app)
  //       .get(`/v1/users/${userOne._id}`)
  //       .set('Authorization', `Bearer ${userOneAccessToken}`)
  //       .send()
  //       .expect(httpStatus.OK);

  //     expect(res.body).not.toHaveProperty('password');
  //     expect(res.body).toEqual({
  //       id: userOne._id.toHexString(),
  //       email: userOne.email,
  //       name: userOne.name,
  //       role: userOne.role,
  //       isEmailVerified: userOne.isEmailVerified,
  //     });
  //   });

  //   test('should return 401 error if access token is missing', async () => {
  //     await insertUsers([userOne]);

  //     await request(app).get(`/v1/users/${userOne._id}`).send().expect(httpStatus.UNAUTHORIZED);
  //   });

  //   test('should return 403 error if user is trying to get another user', async () => {
  //     await insertUsers([userOne, userTwo]);

  //     await request(app)
  //       .get(`/v1/users/${userTwo._id}`)
  //       .set('Authorization', `Bearer ${userOneAccessToken}`)
  //       .send()
  //       .expect(httpStatus.FORBIDDEN);
  //   });

  //   test('should return 200 and the user object if admin is trying to get another user', async () => {
  //     await insertUsers([userOne, admin]);

  //     await request(app)
  //       .get(`/v1/users/${userOne._id}`)
  //       .set('Authorization', `Bearer ${adminAccessToken}`)
  //       .send()
  //       .expect(httpStatus.OK);
  //   });

  //   test('should return 400 error if userId is not a valid mongo id', async () => {
  //     await insertUsers([admin]);

  //     await request(app)
  //       .get('/v1/users/invalidId')
  //       .set('Authorization', `Bearer ${adminAccessToken}`)
  //       .send()
  //       .expect(httpStatus.BAD_REQUEST);
  //   });

  //   test('should return 404 error if user is not found', async () => {
  //     await insertUsers([admin]);

  //     await request(app)
  //       .get(`/v1/users/${userOne._id}`)
  //       .set('Authorization', `Bearer ${adminAccessToken}`)
  //       .send()
  //       .expect(httpStatus.NOT_FOUND);
  //   });
  // });

  // describe('DELETE /v1/users/:userId', () => {
  //   test('should return 204 if data is ok', async () => {
  //     await insertUsers([userOne]);

  //     await request(app)
  //       .delete(`/v1/users/${userOne._id}`)
  //       .set('Authorization', `Bearer ${userOneAccessToken}`)
  //       .send()
  //       .expect(httpStatus.NO_CONTENT);

  //     const dbUser = await User.findById(userOne._id);
  //     expect(dbUser).toBeNull();
  //   });

  //   test('should return 401 error if access token is missing', async () => {
  //     await insertUsers([userOne]);

  //     await request(app).delete(`/v1/users/${userOne._id}`).send().expect(httpStatus.UNAUTHORIZED);
  //   });

  //   test('should return 403 error if user is trying to delete another user', async () => {
  //     await insertUsers([userOne, userTwo]);

  //     await request(app)
  //       .delete(`/v1/users/${userTwo._id}`)
  //       .set('Authorization', `Bearer ${userOneAccessToken}`)
  //       .send()
  //       .expect(httpStatus.FORBIDDEN);
  //   });

  //   test('should return 204 if admin is trying to delete another user', async () => {
  //     await insertUsers([userOne, admin]);

  //     await request(app)
  //       .delete(`/v1/users/${userOne._id}`)
  //       .set('Authorization', `Bearer ${adminAccessToken}`)
  //       .send()
  //       .expect(httpStatus.NO_CONTENT);
  //   });

  //   test('should return 400 error if userId is not a valid mongo id', async () => {
  //     await insertUsers([admin]);

  //     await request(app)
  //       .delete('/v1/users/invalidId')
  //       .set('Authorization', `Bearer ${adminAccessToken}`)
  //       .send()
  //       .expect(httpStatus.BAD_REQUEST);
  //   });

  //   test('should return 404 error if user already is not found', async () => {
  //     await insertUsers([admin]);

  //     await request(app)
  //       .delete(`/v1/users/${userOne._id}`)
  //       .set('Authorization', `Bearer ${adminAccessToken}`)
  //       .send()
  //       .expect(httpStatus.NOT_FOUND);
  //   });
  // });

  //   describe('PATCH /v1/users/:userId', () => {
  //     test('should return 200 and successfully update user if data is ok', async () => {
  //       await insertUsers([userOne]);
  //       const updateBody = {
  //         name: faker.name.findName(),
  //         email: faker.internet.email().toLowerCase(),
  //         password: 'newPassword1',
  //       };

  //       const res = await request(app)
  //         .patch(`/v1/users/${userOne._id}`)
  //         .set('Authorization', `Bearer ${userOneAccessToken}`)
  //         .send(updateBody)
  //         .expect(httpStatus.OK);

  //       expect(res.body).not.toHaveProperty('password');
  //       expect(res.body).toEqual({
  //         id: userOne._id.toHexString(),
  //         name: updateBody.name,
  //         email: updateBody.email,
  //         role: 'user',
  //         isEmailVerified: false,
  //       });

  //       const dbUser = await User.findById(userOne._id);
  //       expect(dbUser).toBeDefined();
  //       expect(dbUser.password).not.toBe(updateBody.password);
  //       expect(dbUser).toMatchObject({ name: updateBody.name, email: updateBody.email, role: 'user' });
  //     });

  //     test('should return 401 error if access token is missing', async () => {
  //       await insertUsers([userOne]);
  //       const updateBody = { name: faker.name.findName() };

  //       await request(app).patch(`/v1/users/${userOne._id}`).send(updateBody).expect(httpStatus.UNAUTHORIZED);
  //     });

  //     test('should return 403 if user is updating another user', async () => {
  //       await insertUsers([userOne, userTwo]);
  //       const updateBody = { name: faker.name.findName() };

  //       await request(app)
  //         .patch(`/v1/users/${userTwo._id}`)
  //         .set('Authorization', `Bearer ${userOneAccessToken}`)
  //         .send(updateBody)
  //         .expect(httpStatus.FORBIDDEN);
  //     });

  //     test('should return 200 and successfully update user if admin is updating another user', async () => {
  //       await insertUsers([userOne, admin]);
  //       const updateBody = { name: faker.name.findName() };

  //       await request(app)
  //         .patch(`/v1/users/${userOne._id}`)
  //         .set('Authorization', `Bearer ${adminAccessToken}`)
  //         .send(updateBody)
  //         .expect(httpStatus.OK);
  //     });

  //     test('should return 404 if admin is updating another user that is not found', async () => {
  //       await insertUsers([admin]);
  //       const updateBody = { name: faker.name.findName() };

  //       await request(app)
  //         .patch(`/v1/users/${userOne._id}`)
  //         .set('Authorization', `Bearer ${adminAccessToken}`)
  //         .send(updateBody)
  //         .expect(httpStatus.NOT_FOUND);
  //     });

  //     test('should return 400 error if userId is not a valid mongo id', async () => {
  //       await insertUsers([admin]);
  //       const updateBody = { name: faker.name.findName() };

  //       await request(app)
  //         .patch(`/v1/users/invalidId`)
  //         .set('Authorization', `Bearer ${adminAccessToken}`)
  //         .send(updateBody)
  //         .expect(httpStatus.BAD_REQUEST);
  //     });

  //     test('should return 400 if email is invalid', async () => {
  //       await insertUsers([userOne]);
  //       const updateBody = { email: 'invalidEmail' };

  //       await request(app)
  //         .patch(`/v1/users/${userOne._id}`)
  //         .set('Authorization', `Bearer ${userOneAccessToken}`)
  //         .send(updateBody)
  //         .expect(httpStatus.BAD_REQUEST);
  //     });

  //     test('should return 400 if email is already taken', async () => {
  //       await insertUsers([userOne, userTwo]);
  //       const updateBody = { email: userTwo.email };

  //       await request(app)
  //         .patch(`/v1/users/${userOne._id}`)
  //         .set('Authorization', `Bearer ${userOneAccessToken}`)
  //         .send(updateBody)
  //         .expect(httpStatus.BAD_REQUEST);
  //     });

  //     test('should not return 400 if email is my email', async () => {
  //       await insertUsers([userOne]);
  //       const updateBody = { email: userOne.email };

  //       await request(app)
  //         .patch(`/v1/users/${userOne._id}`)
  //         .set('Authorization', `Bearer ${userOneAccessToken}`)
  //         .send(updateBody)
  //         .expect(httpStatus.OK);
  //     });

  //});
});
