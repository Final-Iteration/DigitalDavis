/* eslint-disable max-len */
/* eslint-disable no-undef */
const faker = require('faker');
const { Challenge } = require('../../../models');
const getChallenge = require('../../fixtures/createUnitChallengeFunction');

describe('Challenge model', () => {
  describe('Challenge validation', () => {
    let newChallenge;
    beforeAll(() =>
      getChallenge().then((response) => {
        newChallenge = response;
      })
    );

    /**
     * Create basic inital challenge
     */
    test('should correctly validate a valid challenge', async () => {
      await expect(
        new Challenge(newChallenge).validate()
      ).resolves.toBeUndefined();
    });

    /**
     * name tests
     * 1. name length < 30
     * 2. name length > 5
     */
    test('should throw a validation error if name length is > 30 characters', async () => {
      newChallenge.name = 'Lorem ipsum dolor sit amethdubj con';
      await expect(new Challenge(newChallenge).validate()).rejects.toThrow();
    });

    test('should throw a validation error if name length is < 5 characters', async () => {
      newChallenge.name = 'hjk';
      await expect(new Challenge(newChallenge).validate()).rejects.toThrow();
    });

    /**
     * creator tests
     * creator length < 30
     * creator length > 3
     * not a string
     */
    test('should throw a validation error if creator length is > 30 characters', async () => {
      newChallenge.creator = 'Lorem ipsum dolor sit amethdubj con';
      await expect(new Challenge(newChallenge).validate()).rejects.toThrow();
    });

    test('should throw a validation error if creator length is < 3 characters', async () => {
      newChallenge.creator = 'hk';
      await expect(new Challenge(newChallenge).validate()).rejects.toThrow();
    });

    test('should throw a validation error if creator is not a string', async () => {
      newChallenge.creator = 123456;
      await expect(new Challenge(newChallenge).validate()).rejects.toThrow();
    });

    /**
     * tags test:
     * Checks if tags is not one of the following
     // eslint-disable-next-line max-len
     * 1. tags must only be of the following ["Emotional", "Environmental", "Intellectual", "Physical", "Social", "Spiritual"]
     * 2. tags cannot be array of numbers
     */
    test('should throw a validation error if the tags are incorrect', async () => {
      newChallenge.tags = ['NOT CORRECT', 'SOCIAL'];
      await expect(new Challenge(newChallenge).validate()).rejects.toThrow();
    });

    test('should throw a validation error if the tags are array', async () => {
      newChallenge.tags = [123456, 456];
      await expect(new Challenge(newChallenge).validate()).rejects.toThrow();
    });

    /**
     * description tests
     * 1. description length > 250
     * 2. not a string
     */

    test('should throw a validation error if description length is >250 characters', async () => {
      newChallenge.description =
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium.';
      await expect(new Challenge(newChallenge).validate()).rejects.toThrow();
    });

    test('should throw a validation error if description is not a string', async () => {
      newChallenge.description = 123456;
      await expect(new Challenge(newChallenge).validate()).rejects.toThrow();
    });

    /**
     * summary tests
     * 1. summary length > 150
     * 2. not a string
     */

    test('should throw a validation error if summary length is >150 characters', async () => {
      newChallenge.summary =
        // eslint-disable-next-line max-len
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis pa';
      await expect(new Challenge(newChallenge).validate()).rejects.toThrow();
    });

    test('should throw a validation error if summary is not a string', async () => {
      newChallenge.summary = 123456;
      await expect(new Challenge(newChallenge).validate()).rejects.toThrow();
    });

    /**
     * location tests
     * 1. location length > 50
     * 2. location length < 1
     * 3. not a string
     */
    test('should throw a validation error if location length is > 50 characters', async () => {
      newChallenge.location =
        'Lorem ipsum dolor sit amet, consectetuer adipiscing';
      await expect(new Challenge(newChallenge).validate()).rejects.toThrow();
    });

    test('should throw a validation error if location length is < 1 characters', async () => {
      newChallenge.location = '';
      await expect(new Challenge(newChallenge).validate()).rejects.toThrow();
    });

    test('should throw a validation error if location is not a string', async () => {
      newChallenge.location = 123456;
      await expect(new Challenge(newChallenge).validate()).rejects.toThrow();
    });

    /**
     * splashurl tests
     * 1. not a string
     */
    test('should throw a validation error if unsplashurl is not a string', async () => {
      newChallenge.unsplashurl = 123456;
      await expect(new Challenge(newChallenge).validate()).rejects.toThrow();
    });

    /**
     * start_date tests
     * 1. start_date >=today's date
     * 2. start_date is invalid date
     */
    test("should throw a validation error if start_date is < today's date", async () => {
      newChallenge.start_date = faker.date.past;
      await expect(new Challenge(newChallenge).validate()).rejects.toThrow();
    });

    test('should throw a validation error if start_date is an invalid date', async () => {
      newChallenge.start_date = '2021-30T18:07:39.308Z';
      await expect(new Challenge(newChallenge).validate()).rejects.toThrow();
    });

    /**
     * end_date tests
     * 1. end_date >=today's date
     * 2. end_date is invalid date
     */
    test("should throw a validation error if end_date is < today's date", async () => {
      newChallenge.end_date = faker.date.past;
      await expect(new Challenge(newChallenge).validate()).rejects.toThrow();
    });

    test('should throw a validation error if end_date is an invalid date', async () => {
      newChallenge.end_date = '2021-30T18:07:39.308Z';
      await expect(new Challenge(newChallenge).validate()).rejects.toThrow();
    });

    /**
     * participants test
     * 1. Check if not string
     */
    test('should throw a validation error if participants is not a string', async () => {
      newChallenge.participants = 123456;
      await expect(new Challenge(newChallenge).validate()).rejects.toThrow();
    });
  });
});
