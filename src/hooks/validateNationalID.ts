
export default function validateNationalID(
  NatNo: string,
  gender: string,
  DOB: string
) {
  if (!Number(NatNo)) return "يجب أن يحتوي الرقم الوطني على أرقام فقط";
  if (NatNo.length !== 12) {
    return "الرقم الوطني يجب أن يكون مكوناً من 12 رقم";
  }
  if (NatNo[0] !== gender) {
      return "الجنس المختار لا يتوافق مع الرقم الوطني";
    }
    
  const yearFromID = NatNo.substring(1, 5);
  const birthYear = new Date(DOB).getFullYear();
  const currentYear = new Date().getFullYear();

  if (yearFromID !== birthYear.toString()) {
    return "سنة الميلاد لا تتوافق مع الرقم الوطني";
  }

  const age = currentYear - birthYear;
  if (age < 16) {
    return "يجب أن يكون عمر الشخص فوق 16 سنة بناءً على سنة الميلاد";
  }

  return "";
}
