/**
 * Validates a string based on custom rules
 * @param input - The string to validate
 * @returns boolean
 */
const validateUsername = (input: string): boolean => {
  const regex = /^(?!\d)[A-Za-z0-9@$]{8,}$/;
  return regex.test(input);
};

export default validateUsername;
