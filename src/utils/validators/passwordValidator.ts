export const passwordsMatch = (
  password: string,
  confirmPassword: string
): boolean => {
  return password === confirmPassword;
};
