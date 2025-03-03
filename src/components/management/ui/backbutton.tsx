import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";

function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="absolute top-28 left-8 size-10 z-0">
      <Button
        type="button"
        onClick={handleBack}
        className="w-10 h-10 bg-secondary text-white rounded-3xl"
      >
        <IoMdArrowRoundBack />
      </Button>
    </div>
  );
}

export default BackButton;
