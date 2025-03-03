import { useState } from "react";

function useValidateNationalID() {
  const [errorNationalId, setError] = useState<string>("");

  const validate = (NatNo: string, gender?: string, DOB?: string): boolean => {
    if (!Number(NatNo)) {
      setError("يجب أن يحتوي الرقم الوطني على أرقام فقط");
      return false;
    }

    if (NatNo.length !== 12) {
      setError("الرقم الوطني يجب أن يكون مكوناً من 12 رقم");
      return false;
    }

    // التحقق من تطابق الجنس مع الرقم الوطني
    if (gender && NatNo[0] !== gender) {
      setError("الجنس المختار لا يتوافق مع الرقم الوطني");
      return false;
    }

    // التحقق من تطابق سنة الميلاد
    const yearFromID = NatNo.substring(1, 5);
    if (DOB) {
      const birthYear = new Date(DOB).getFullYear();
      if (yearFromID !== birthYear.toString()) {
        setError("سنة الميلاد لا تتوافق مع الرقم الوطني");
        return false;
      }

      const currentYear = new Date().getFullYear();
      const age = currentYear - birthYear;
      if (age < 16) {
        setError("يجب أن يكون عمر الشخص فوق 16 سنة بناءً على سنة الميلاد");
        return false;
      }
    }

    // إذا كانت جميع الشروط سليمة
    setError(""); // في حال تم التحقق بنجاح
    return true;
  };

  return { errorNationalId, validate };
}

export default useValidateNationalID;
