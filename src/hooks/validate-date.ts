/**
 * Validates a date range (start and end dates) and checks if the duration is within a specified range
 * @param startDate - The start date or year (format: yyyy or yyyy-mm-dd)
 * @param endDate - The end date or year (format: yyyy or yyyy-mm-dd)
 * @param minDuration - The minimum allowed duration between dates (in days)
 * @param maxDuration - The maximum allowed duration between dates (in days)
 * @returns boolean - Returns true if the duration between the dates is within the range [minDuration, maxDuration]
 */
const ValidateDateRange = (
  startDate: string,
  endDate: string,
  minDuration: number = 0, // Minimum allowed duration in days
  maxDuration: number = Infinity // Maximum allowed duration in days
): boolean => {
  const dateRegex = /^\d{4}(-\d{2}-\d{2})?$/;
  const yearRegex = /^\d{4}$/;

  if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
    return false; // Invalid date format
  }

  const start = yearRegex.test(startDate)
    ? new Date(`${startDate}-01-01`)
    : new Date(startDate);
  const end = yearRegex.test(endDate)
    ? new Date(`${endDate}-12-31`)
    : new Date(endDate);

  if (start > end) return false; // Start date must be before end date

  // Calculate duration in days
  const durationInDays = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Validate if the duration is within the specified range
  return durationInDays >= minDuration && durationInDays <= maxDuration;
};

export default ValidateDateRange;
