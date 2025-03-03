export default function UpdateButton({
  onClick,
  onDisable,
}: {
  onClick: () => void;
  onDisable: () => void;
}) {
  return (
    <div className="flex flex-row justify-center flex-wrap mt-16">
      <div
        className="bg-secondary text-white text-xl px-6 py-2 text-center rounded-md hover:bg-secondary/80 w-60 h-12 cursor-pointer ml-10"
        onClick={onClick}
      >
        <span>قبول التغييرات</span>
      </div>
      <div
        className="bg-muted text-black text-xl px-6 py-2 text-center rounded-md hover:bg-muted-700 w-60 h-12 cursor-pointer ml-72"
        onClick={onDisable}
      >
        <span>تعطيل الحساب</span>
      </div>
    </div>
  );
}
