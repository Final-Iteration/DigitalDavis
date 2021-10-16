const faker = require("faker");
const { Challenge } = require("../../../models/challenge.model");

describe("Challenge model", () => {
  describe("Challenge validation", () => {
    let newChallenge;
    beforeEach(() => {
      newChallenge = {
        name: faker.random.words(),
        creator: faker.name.findName(),
        tags: faker.random.arrayElements(),
        description: faker.random.words(),
        location: faker.address.city(),
        timestamp: faker.date.recent(),
        start_date: faker.date.soon(),
        end_date: faker.date.future(),
        participants: [
          `${faker.name.findName()}`,
          `${faker.name.findName()}`,
          `${faker.name.findName()}`,
          `${faker.name.findName()}`,
          `${faker.name.findName()}`,
        ],
      };
    });

    test("should correctly validate a valid challenge", async () => {
      await expect(
        new Challenge(newChallenge).validate());
    });

    //     test("should throw a validation error if email is invalid", async () => {
    //       newChallenge.email = "invalidEmail";
    //       await expect(new Challenge(newChallenge).validate()).rejects.toThrow();
    //     });

    //     test("should throw a validation error if password length is less than 8 characters", async () => {
    //       newChallenge.password = "passwo1";
    //       await expect(new Challenge(newChallenge).validate()).rejects.toThrow();
    //     });

    //     test("should throw a validation error if password does not contain numbers", async () => {
    //       newChallenge.password = "password";
    //       await expect(new Challenge(newChallenge).validate()).rejects.toThrow();
    //     });

    //     test("should throw a validation error if password does not contain letters", async () => {
    //       newChallenge.password = "11111111";
    //       await expect(new Challenge(newChallenge).validate()).rejects.toThrow();
    //     });

    //     test("should throw a validation error if role is unknown", async () => {
    //       newChallenge.role = "invalid";
    //       await expect(new Challenge(newChallenge).validate()).rejects.toThrow();
    //     });
    //   });

    //   describe("Challenge toJSON()", () => {
    //     test("should not return challenge password when toJSON is called", () => {
    //       const newChallenge = {
    //         name: faker.name.findName(),
    //         email: faker.internet.email().toLowerCase(),
    //         password: "password1",
    //         role: "challenge",
    //       };
    //       expect(new Challenge(newChallenge).toJSON()).not.toHaveProperty(
    //         "password"
    //       );
    //     });
  });
});
