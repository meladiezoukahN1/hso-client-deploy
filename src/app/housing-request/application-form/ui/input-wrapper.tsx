import React from "react";

const InputWrapper = ({
  children,
  NameInput,
  NameLabel,
}: {
  children: React.ReactNode;
  NameInput: string;
  NameLabel: string;
}) => {
  return (
    <div className="mx-4 my-3">
      <div className="flex w-full flex-row">
        <label
          htmlFor={NameInput}
          className="md:text-lg text-sm font-semibold text-gray-700 w-52 flex items-center"
        >
          {NameLabel}
        </label>
        {children}
      </div>
    </div>
  );
};

export default InputWrapper;
