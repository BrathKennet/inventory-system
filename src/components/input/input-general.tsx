export default function InputGeneral({
  label,
  id,
  name,
  type,
  placeholder,
  onChange,
  defaultValue,
  value,
  error,
  disabled,
  readOnly,
}: {
  label: string;
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
  onChange?: any;
  defaultValue?: string;
  value?: string;
  error?: string[];
  disabled?: boolean;
  readOnly?: boolean;
}) {
  return (
    <div className="w-full">
      <label htmlFor={id} className="left-0 text-primary text-sm">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type ?? "text"}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        disabled={disabled}
        readOnly={readOnly}
        className="placeholder-slate-500 h-10 w-full border-b-2 border-gray-300 text-gray-300 focus:outline-none focus:border-primary bg-transparent text-base disabled:text-gray-400 disabled:border-gray-400 "
      />
      <p className="text-red-400 text-base">{error && error[0]}</p>
    </div>
  );
}
