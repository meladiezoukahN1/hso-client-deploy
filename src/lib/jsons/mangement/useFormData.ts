import { useState } from "react";

export function useFormData() {
  const [formData, setFormData] = useState({
    fullName: "عبدالباقي",
    username: "AbdulBaki",
    phone: "0921234567",
    email: "baki@gmail.com",
    address: "قرجي",
    bulderName: "E1",
    Totalrooms: "39",
    Hauntedrooms: "38",
    Roomsavailable: "1",
    Numberfloors: "2",
    Roomcapacity: "3",
    population: "2",
    Roomnumber: "105",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return { formData, setFormData, handleInputChange, handleSubmitForm };
}
