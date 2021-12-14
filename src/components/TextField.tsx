interface Props {
  name: string;
  value: string;
  placeholder: string;
  type?: "text" | "number";
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextField({
  name,
  placeholder,
  value,
  type,
  onChange,
}: Props) {
  return (
    <input
      className="p-2 rounded-sm"
      name={name}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
}
