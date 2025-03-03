interface LoadingPops {
  ClassName?: string;
}

const LoadingIcon = ({ ClassName }: LoadingPops) => {
  return (
    <div
      className={`flex items-center justify-center ${
        ClassName ? ClassName : "min-h-screen bg-gray-100"
      } `}
    >
      <div
        className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
      </div>
    </div>
  );
};

export default LoadingIcon;
