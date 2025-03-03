/**
 * Validates an email address
 * @param email - The email string to validate
 * @returns boolean
 */
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
  return emailRegex.test(email);
};

export default validateEmail;
