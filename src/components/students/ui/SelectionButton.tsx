type SelectionButtonProps = {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
};

const SelectionButton = ({
  selected,
  onClick,
  children,
  className = "",
}: SelectionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-36 py-2 rounded-lg hover:bg-primary-600 hover:border-primary-600 hover:text-white font-bold border-2 transition-colors ${
        selected
          ? "border-primary-700 bg-primary-700 text-white "
          : " bg-[#D9D9D9] border-[#D9D9D9] "
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default SelectionButton;
