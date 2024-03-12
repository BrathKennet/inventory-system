export default function SelectGeneral({
  id,
  name,
  label,
  options,
  error,
  handleChange,
  defaultValue,
}: {
  id: string;
  name: string;
  label: string;
  options: any[] | null;
  error?: string[];
  handleChange?: any;
  defaultValue?: string;
}) {
  return (
    <div className="w-full">
      <label htmlFor={id} className="left-0 text-primary text-sm">
        {label}
      </label>
      <select
        id={id}
        name={name}
        className="h-10 w-full border-b-2 border-gray-300 text-gray-300 focus:border-primary focus:outline-none bg-secondary text-base"
        defaultValue={defaultValue ?? ""}
        onChange={handleChange}
      >
        <option className="hidden" value="" disabled>
          {label}
        </option>
        {options?.map((v) => (
          <option key={v.id} value={v.id}>
            {v.name}
          </option>
        ))}
      </select>
      <p className="text-red-400 text-base">{error && error[0]}</p>
    </div>
  );
}
