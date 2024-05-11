// passwordStrength.test.ts
import { checkPasswordStrength } from '../../utils/validators/passwordStrengthCheck';

describe('checkPasswordStrength', () => {
  it('should return false for a password less than 8 characters', () => {
    expect(checkPasswordStrength('weak')).toBe(false);
  });

  it('should return false for a password with at least 8 characters but missing one type of character', () => {
    expect(checkPasswordStrength('Medium123')).toBe(false);
  });

  it('should return true for a password with exactly 8 characters and containing all required character types', () => {
    expect(checkPasswordStrength('Str0ng@1')).toBe(true);
  });

  it('should return false for an empty password', () => {
    expect(checkPasswordStrength('')).toBe(false);
  });

  it('should return false for a password with spaces', () => {
    expect(checkPasswordStrength('password with spaces')).toBe(false);
  });

  it('should return false for a password with exactly 8 characters but missing uppercase letters', () => {
    expect(checkPasswordStrength('weak@123')).toBe(false);
  });

  it('should return false for a password with exactly 8 characters but missing lowercase letters', () => {
    expect(checkPasswordStrength('WEAK@123')).toBe(false);
  });

  it('should return false for a password with exactly 8 characters but missing numbers', () => {
    expect(checkPasswordStrength('Weak@Pass')).toBe(false);
  });

  it('should return false for a password with exactly 8 characters but missing symbols', () => {
    expect(checkPasswordStrength('WeakPassword1')).toBe(false);
  });
});
