interface ErrorMSGProps {
  error: string;
}
const ErrorMSG = ({ error }: ErrorMSGProps) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <p className="text-danger text-center text-2xl">{error}</p>
    </div>
  );
};

export default ErrorMSG;
