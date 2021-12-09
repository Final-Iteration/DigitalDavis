/* eslint-disable no-undef */
const faker = require('faker');
const { User } = require('../../../models');

/**
 *
 */
describe('User model', () => {
  describe('User validation', () => {
    let newUser;
    beforeEach(() => {
      newUser = {
        first_name: faker.name.findName(),
        last_name: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        dob: faker.date.past(), // May have to modify date format passed by faker
        job_title: [
          `${faker.name.jobTitle()}`,
          `${faker.name.jobTitle()}`,
          `${faker.name.jobTitle()}`,
        ],
        password: '1234567abd',
        department: faker.commerce.department(),
      };
    });

    /**
     *
     */
    test('should correctly validate a valid user', async () => {
      await expect(new User(newUser).validate()).resolves.toBeUndefined();
    });

    /**
     * first_name tests
     * 1. first_name length > 30
     * 2. first_name length < 1
     */
    test('should throw a validation error if first name length is > 30 characters', async () => {
      newUser.first_name = 'Lorem ipsum dolor sit amet, con';
      await expect(new User(newUser).validate()).rejects.toThrow();
    });

    /**
     *
     */
    test('should throw a validation error if first name length is < 1 characters', async () => {
      newUser.first_name = '';
      await expect(new User(newUser).validate()).rejects.toThrow();
    });

    /**
     * last_name tests
     * 1. last_name length > 30
     * 2. last_name length < 1
     */
    test('should throw a validation error if last name length is > 30 characters', async () => {
      newUser.last_name = '';
      ('Lorem ipsum dolor sit amet, con');
      await expect(new User(newUser).validate()).rejects.toThrow();
    });

    /**
     *
     */
    test('should throw a validation error if last name length is < 1 characters', async () => {
      newUser.last_name = '';
      await expect(new User(newUser).validate()).rejects.toThrow();
    });

    /**
     * email tests
     * 1. email length > 50
     * 2. invalid email
     */
    test('should throw a validation error if email length is > 50 characters', async () => {
      newUser.email = 'Lorem ipsum dolor sit amet, consectetuer adipiscing';
      ('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium q');
      await expect(new User(newUser).validate()).rejects.toThrow();
    });

    test('should throw a validation error if email is invalid', async () => {
      newUser.email = 'invalidemail';
      await expect(new User(newUser).validate()).rejects.toThrow();
    });

    /**
     * @todo add validation for DOB
     */
  });
});
