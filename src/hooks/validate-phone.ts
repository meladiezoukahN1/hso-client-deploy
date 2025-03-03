/**
 * Validates a Libyan phone number
 * Supports formats:
 *  - 00 218 9x xxxxxxx
 *  - +218 9x xxxxxxx
 *  - 09x xxxxxxx
 * @param phoneNumber - The phone number string to validate
 * @returns boolean
 */
const validateLibyanPhoneNumber = (phoneNumber: string): boolean => {
  const libyanPhoneRegex =
    /^(?:\+218|00218)?(91|92|93|94)\d{7}$|^09(1|2|3|4)\d{7}$/;
  return libyanPhoneRegex.test(phoneNumber.trim());
};

export default validateLibyanPhoneNumber;
