import { Spinner } from "@nextui-org/react";

const Loading = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Spinner size="lg" />
    </div>
  );
};

export default Loading;
