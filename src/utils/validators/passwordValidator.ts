export const passwordsMatch = (
  password: string,
  confirmPassword: string
): boolean => {
  if (password === '' && confirmPassword === '') return false;
  return password === confirmPassword;
};
