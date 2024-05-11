// usernameValidator.test.ts
import { validateUsername } from '../../utils/validators/userNameValidator';

describe('validateUsername', () => {
  it('should return true for a valid username without numbers', () => {
    expect(validateUsername('john_doe')).toBe(true);
  });

  it('should return false for a username with numbers', () => {
    expect(validateUsername('JohnDoe1')).toBe(false);
  });

  it('should return false for a username less than 3 characters', () => {
    expect(validateUsername('jo')).toBe(false);
  });

  it('should return false for a username longer than 8 characters', () => {
    expect(validateUsername('very_long_username')).toBe(false);
  });

  it('should return false for a username containing special characters', () => {
    expect(validateUsername('john.doe')).toBe(false);
  });

  it('should return false for a username containing spaces', () => {
    expect(validateUsername('john doe')).toBe(false);
  });

  it('should return true for a valid username with underscores only', () => {
    expect(validateUsername('__user__')).toBe(true);
  });

  it('should return false for an empty username', () => {
    expect(validateUsername('')).toBe(false);
  });
});
