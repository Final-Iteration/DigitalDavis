/* eslint-disable no-undef */
const request = require("supertest");
const faker = require("faker");
const httpStatus = require("http-status");
const app = require("../../../mongo-api/app");
//Need to replace this with our own DB
const setupTestDB = require("../utils/setupTestDB");
const { User } = require("../../models");
const {
  userOneAccessToken,
  userTwoAccessToken,
  userThreeAccessToken,
} = require("../fixtures/token.fixtures");

const {
  userOne,
  userTwo,
  insertUsers,
  userThree,
} = require("../fixtures/user.fixture");

/**
 * used to setup test db
 */
setupTestDB();

describe("User routes", () => {
  describe("POST /api/users", () => {
    let newUser;

    beforeEach(() => {
      newUser = {
        first_name: faker.name.findName(),
        last_name: faker.name.findName(),
        password: "1234567abd",
        email: faker.internet.email().toLowerCase(),
        job_title: [`${faker.name.jobTitle()}`],
        department: faker.commerce.department(),
      };
    });

    test("should return 201 and successfully create new user if data is ok", async () => {
      const res = await request(app)
        .post("/api/users")
        .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
        .send(newUser)
        .expect(httpStatus.CREATED);

      expect(res.body).toEqual({
        id: expect.anything(),
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        password: expect.anything(),
        job_title: newUser.job_title,
        department: newUser.department,
      });

      const dbUser = await User.findById(res.body.id);
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

    test("should return 400 error if email is invalid", async () => {
      newUser.email = "invalidEmail";

      await request(app)
        .post("/api/users")
        .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 400 error if email is already used", async () => {
      await insertUsers([userOne]);
      newUser.email = userOne.email;

      await request(app)
        .post("/api/users")
        .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 400 error if email length is more than 50 characters", async () => {
      newUser.email = "Lorem ipsum dolor sit amet, consectetuer adipiscing";

      await request(app)
        .post("/api/users")
        .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 400 error if first name length is more than 30 characters", async () => {
      newUser.first_name = "Lorem ipsum dolor sit amet, con";

      await request(app)
        .post("/api/users")
        .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 400 error if first name length is less than 1 characters", async () => {
      newUser.first_name = "";

      await request(app)
        .post("/api/users")
        .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 400 error if last name length is more than 30 characters", async () => {
      newUser.last_name = "Lorem ipsum dolor sit amet, con";

      await request(app)
        .post("/api/users")
        .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 400 error if last name length is less than 1 characters", async () => {
      newUser.last_name = "";

      await request(app)
        .post("/api/users")
        .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 400 error if password length is less than 8 characters", async () => {
      newUser.password = "Lo";

      await request(app)
        .post("/api/users")
        .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe("GET /api/users", () => {
    test("should return 200 and apply the default query options", async () => {
      await insertUsers([userOne, userTwo]);

      const res = await request(app)
        .get("/api/users")
        .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
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
        password: expect.anything(),
        email: userOne.email,
        job_title: userOne.job_title,
        department: userOne.department,
      });
    });

    test("should correctly apply filter on first name field", async () => {
      await insertUsers([userOne, userTwo]);

      const res = await request(app)
        .get("/api/users")
        .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
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

    // eslint-disable-next-line max-len
    test("should correctly sort the returned array if descending sort param  by first_name is specified", async () => {
      await insertUsers([userOne, userTwo]);

      const res = await request(app)
        .get("/api/users")
        .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
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
        .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
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
        .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
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

    test("should limit returned array if limit param is specified", async () => {
      await insertUsers([userOne, userTwo, userThree]);

      const res = await request(app)
        .get("/api/users")
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
      expect(res.body.results[0].id).toBe(userOne._id.toHexString());
      expect(res.body.results[1].id).toBe(userTwo._id.toHexString());
    });

    test("should return the correct page if page and limit params are specified", async () => {
      await insertUsers([userOne, userTwo, userThree]);

      const res = await request(app)
        .get("/api/users")
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
      expect(res.body.results[0].id).toBe(userThree._id.toHexString());
    });
  });

  describe("GET /api/users/:userId", () => {
    test("should return 200 and the user object if data is ok", async () => {
      await insertUsers([userOne]);

      const res = await request(app)
        .get(`/api/users/${userOne._id}`)
        .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        id: userOne._id.toHexString(),
        first_name: userOne.first_name,
        last_name: userOne.last_name,
        email: userOne.email,
        password: expect.anything(),
        job_title: userOne.job_title,
        department: userOne.department,
      });
    });

    test.skip("should return 401 error if access token is missing", async () => {
      await insertUsers([userOne]);

      await request(app)
        .get(`/api/users/${userOne._id}`)
        .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
        .send()
        .expect(httpStatus.UNAUTHORIZED);
    });

    test("should return 400 error if userId is not a valid mongo id", async () => {
      await insertUsers([userOne]);

      await request(app)
        .get("/api/users/invalidId")
        .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })

        .send()
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 404 error if user is not found", async () => {
      await insertUsers([userTwo]);

      await request(app)
        .get(`/api/users/${userOne._id}`)
        .set({ 'Authorization': `Bearer ${userOneAccessToken}`, 'ID': userOne._id })
        .send()
        .expect(httpStatus.NOT_FOUND);
    });
  });

  describe("DELETE /api/users/:userId", () => {
    test("should return 204 if data is ok", async () => {
      await insertUsers([userOne]);

      await request(app)
        .delete(`/api/users/${userOne._id}`)
        .set({ Authorization: `Bearer ${userOneAccessToken}`, ID: userOne._id })
        .send()
        .expect(httpStatus.NO_CONTENT);

      const dbUser = await User.findById(userOne._id);
      expect(dbUser).toBeNull();
    });

    test.skip("should return 401 error if access token is missing", async () => {
      await insertUsers([userOne]);

      await request(app)
        .delete(`/api/users/${userOne._id}`)
        .set({ Authorization: `Bearer ${userOneAccessToken}`, ID: userOne._id })
        .send()
        .expect(httpStatus.UNAUTHORIZED);
    });

    test("should return 400 error if userId is not a valid mongo id", async () => {
      await insertUsers([userOne]);

      await request(app)
        .delete("/api/users/invalidId")
        .set({ Authorization: `Bearer ${userOneAccessToken}`, ID: userOne._id })
        .send()
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 404 error if user already is not found", async () => {
      await insertUsers([userOne]);

      await request(app)
        .delete(`/api/users/${userTwo._id}`)
        .set({ Authorization: `Bearer ${userOneAccessToken}`, ID: userOne._id })
        .send()
        .expect(httpStatus.NOT_FOUND);
    });
  });
});
