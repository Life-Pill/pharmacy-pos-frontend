import { passwordsMatch } from '../../utils/validators/passwordValidator';

describe('passwordsMatch', () => {
  it('should return true if passwords match', () => {
    const password = 'SecretPassword';
    const confirmPassword = 'SecretPassword';
    expect(passwordsMatch(password, confirmPassword)).toBe(true);
  });

  it('should return false if passwords do not match', () => {
    const password = 'SecretPassword';
    const confirmPassword = 'DifferentPassword';
    expect(passwordsMatch(password, confirmPassword)).toBe(false);
  });

  it('should return false if one password is empty', () => {
    const password = 'SecretPassword';
    const confirmPassword = '';
    expect(passwordsMatch(password, confirmPassword)).toBe(false);
  });

  it('should return false if both passwords are empty', () => {
    const password = '';
    const confirmPassword = '';
    expect(passwordsMatch(password, confirmPassword)).toBe(false);
  });

  it('should return true if both passwords are empty strings', () => {
    const password = '';
    const confirmPassword = '';
    expect(passwordsMatch(password, confirmPassword)).toBe(false);
  });
});
