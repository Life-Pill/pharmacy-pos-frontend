// usernameValidator.ts
export const validateUsername = (username: string): boolean => {
  // Check if username is between 3 and 8 characters long
  if (username.length < 3 || username.length > 8) {
    return false;
  }

  // Check if username contains only alphanumeric characters and underscores
  if (!/^[a-zA-Z_]+$/.test(username)) {
    return false;
  }

  // Additional checks can be added here, such as checking uniqueness in a database

  return true;
};
