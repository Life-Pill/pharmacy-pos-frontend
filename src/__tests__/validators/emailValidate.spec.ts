// Import the validateEmail function
import { validateEmail } from '../../utils/validators/EmailValidator';

describe('validateEmail', () => {
  it('should return true for valid email address', () => {
    expect(validateEmail('test@example.com')).toBe(true);
  });

  it('should return true for email with numbers in local part', () => {
    expect(validateEmail('user123@example.com')).toBe(true);
  });

  it('should return true for email with hyphen in local part', () => {
    expect(validateEmail('user-name@example.com')).toBe(true);
  });

  it('should return true for email with dot in local part', () => {
    expect(validateEmail('user.name@example.com')).toBe(true);
  });

  it('should return true for email with subdomain', () => {
    expect(validateEmail('user@sub.domain.com')).toBe(true);
  });

  it('should return false for email without @ symbol', () => {
    expect(validateEmail('invalidemail')).toBe(false);
  });

  it('should return false for email without domain', () => {
    expect(validateEmail('user@')).toBe(false);
  });

  it('should return false for email with invalid characters', () => {
    expect(validateEmail('user@example,com')).toBe(false);
  });

  it('should return false for email with spaces', () => {
    expect(validateEmail('user@example.com ')).toBe(false);
  });
});
