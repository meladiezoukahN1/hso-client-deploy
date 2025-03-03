type FormFieldProps = {
  label: string;
  children: React.ReactNode;
  className?: string;
  classLabel?: string;
};

export const FormField = ({
  label,
  children,
  className,
  classLabel,
}: FormFieldProps) => (
  <div className={className ? className : "flex items-center space-x-2"}>
    <label className={classLabel ? classLabel : "block font-bold"}>
      <span className="w-44 text-base">{label}</span>
    </label>
    {children}
  </div>
);
