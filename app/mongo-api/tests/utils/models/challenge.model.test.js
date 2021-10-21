/* eslint-disable no-undef */
const faker = require("faker");
const { Challenge } = require("../../../models");

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

describe("Challenge model", () => {
  describe("Challenge validation", () => {
    let newChallenge;
    beforeEach(() => {
      newChallenge = {
        name: faker.random.words(2),
        creator: faker.lorem.words(3).substring(0, 30),
        tags: shuffle(challengeTags),
        creator: faker.lorem.words(3).substring(0, 30),
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

    /**
     * Create basic inital challenge
     */
    test("should correctly validate a valid challenge", async () => {
      await expect(
        new Challenge(newChallenge).validate()
      ).resolves.toBeUndefined();
    });

    /**
     * name tests
     * 1. name length < 30
     * 2. name length > 5
     */
    test("should throw a validation error if name length is > 30 characters", async () => {
      newChallenge.name = "Lorem ipsum dolor sit amethdubj con";
      await expect(new Challenge(newChallenge).validate()).rejects.toThrow();
    });

    test("should throw a validation error if name length is < 5 characters", async () => {
      newChallenge.name = "hjk";
      await expect(new Challenge(newChallenge).validate()).rejects.toThrow();
    });

    /**
     * creator tests
     * creator length < 30
     * creator length > 3
     */
    test("should throw a validation error if creator length is > 30 characters", async () => {
      newChallenge.creator = "Lorem ipsum dolor sit amethdubj con";
      await expect(new Challenge(newChallenge).validate()).rejects.toThrow();
    });

    /**
     *
     */
    test("should throw a validation error if creator length is < 3 characters", async () => {
      newChallenge.creator = "hk";
      await expect(new Challenge(newChallenge).validate()).rejects.toThrow();
    });

    /**
     * tags tests
     * @TODO
     * 1. tags must only be of the following ["Emotional", "Environmental", "Intellectual", "Physical", "Social", "Spiritual"]
     */
    test("should throw a validation error if tags length is > 30 characters", async () => {
      newChallenge.tags = ["NOT CORRECT", "SOCIAL"];
      await expect(new Challenge(newChallenge).validate()).rejects.toThrow();
    });

    /**
     * description tests
     * 1. description length < 150
     */

    test("should throw a validation error if description length is >150 characters", async () => {
      newChallenge.description =
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis pa";
      await expect(new Challenge(newChallenge).validate()).rejects.toThrow();
    });

    /**
     * location tests
     * 1. location length > 50
     * 2. location length < 1
     */
    test("should throw a validation error if location length is > 50 characters", async () => {
      newChallenge.location =
        "Lorem ipsum dolor sit amet, consectetuer adipiscing";
      await expect(new Challenge(newChallenge).validate()).rejects.toThrow();
    });

    test("should throw a validation error if location length is < 1 characters", async () => {
      newChallenge.location = "";
      await expect(new Challenge(newChallenge).validate()).rejects.toThrow();
    });

    /**
     * start_date tests
     * 1. start_date >=today's date
     */
    test("should throw a validation error if start_date is < today's date", async () => {
      newChallenge.start_date = faker.date.past;
      await expect(new Challenge(newChallenge).validate()).rejects.toThrow();
    });

    /**
     * end_date tests
     * 1. end_date >=today's date
     */
    test("should throw a validation error if end_date is < today's date", async () => {
      newChallenge.end_date = faker.date.past;
      await expect(new Challenge(newChallenge).validate()).rejects.toThrow();
    });

    /**
     * @TODO
     * Validation(participants)
     */
    // test("should correctly validate a valid challenge", async () => {
    //   await expect(
    //     new Challenge(newChallenge).validate());
    // });
  });
});
