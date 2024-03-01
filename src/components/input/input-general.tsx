export default function InputGeneral({
  label,
  id,
  name,
  type,
  placeholder,
  defaultValue,
  error,
}: {
  label: string;
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  error: string[] | undefined;
}) {
  return (
    <div>
      <label htmlFor={id} className="left-0 text-primary text-sm">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type ?? "text"}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder ?? ""}
        className="placeholder-slate-500 h-10 w-full border-b-2 border-gray-300 text-gray-300 focus:outline-none focus:borer-rose-600 bg-transparent text-base "
      />
      <p className="text-red-400 text-base">{error && error[0]}</p>
    </div>
  );
}
