/**
 * Validates if the given string consists of one or two words, each containing only Arabic characters.
 * @param text - The input string to validate.
 * @returns boolean
 */
export const validateArabicOnly = (text: string): boolean => {
  // نطاق الأحرف العربية الشائعة في يونيكود: U+0600 إلى U+06FF
  const arabicRegex = /^[\u0600-\u06FF]+( [\u0600-\u06FF]+)?$/;
  return arabicRegex.test(text.trim());
};
