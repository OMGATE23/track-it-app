export default function DropdownTime({
  label,
  value,
  changeHandler,
  disabledOptions = [],
}: {
  label: string;
  value: number;
  changeHandler: (value: number) => void;
  disabledOptions?: number[];
}) {
  const options = [];
  for (let i = 0; i <= 24 * 60; i += 15) {
    const hours = Math.floor(i / 60)
      .toString()
      .padStart(2, "0");
    const minutes = (i % 60).toString().padStart(2, "0");
    const time = `${hours}:${minutes}`;
    options.push({ value: i, label: time });
  }

  return (
    <div className="flex gap-2 w-full items-center">
      <label className=" text-sm">{label}</label>
      <select
        className="outline outline-1 outline-neutral-300 p-2 rounded-md"
        value={value}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
          changeHandler(+event.target.value);
        }}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={disabledOptions.includes(option.value)}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
