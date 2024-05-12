// passwordStrength.ts
export const checkPasswordStrength = (password: string): boolean => {
  if (password.length < 8) {
    return false;
  }

  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

  return hasLowerCase && hasUpperCase && hasNumber && hasSymbol;
};
