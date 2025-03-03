type StepProp = {
  title: string;
  details: string[];
};

type Props = {
  step: StepProp;
  index: number;
};

const Step = ({ step, index }: Props) => {
  return (
    <div
      className={`p-4 w-full md:w-[40%] self-center flex flex-col items-center md:items-start ${
        index % 2 === 0 ? "md:justify-start" : "md:justify-end"
      }`}
    >
      <h3 className="text-medium md:text-3xl font-bold mb-4 text-center md:text-right">
        <span className="text-yellow-500">{step.title.split(". ")[0]}.</span>{" "}
        <span className="text-[#192845]">{step.title.split(". ")[1]}</span>
      </h3>

      <div className="w-fit ">
        <ul className="list-disc list-outside pr-6 md:pr-9 text-[#192845] marker:text-[#192845] text-[16px] md:text-2xl text-center md:text-right">
          {step.details.map((detail, i) => (
            <li key={i} className="mb-2">
              {detail}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Step;
