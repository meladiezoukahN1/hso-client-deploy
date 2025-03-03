"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";

const BackButton = () => {
  const router = useRouter();
 
  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex justify-end items-center pt-4">
      <Button
        type="button"
        onClick={handleBack}
        className="w-10 h-10 ml-9 bg-secondary text-white rounded-3xl"
      >
        <IoMdArrowRoundBack />
      </Button>
    </div>
  );
};

export default BackButton;
