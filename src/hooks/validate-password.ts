/**
 * Validates an password address
 * @param password - The password string to validate
 * @returns boolean
 */
const validatePassword = (password: string): boolean => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasNumber = /[2-9]/.test(password);
  return (
    password.length >= minLength &&
    (hasUpperCase || hasSpecialCharacter || hasNumber)
  );
};

export default validatePassword;
