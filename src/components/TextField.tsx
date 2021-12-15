type OnChangeFn = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => void;

interface Props {
  name: string;
  value?: string;
  placeholder: string;
  type?: "text" | "number";
  onChange?: OnChangeFn;
  rows?: number;
}

export default function TextField({
  name,
  placeholder,
  value,
  type,
  onChange,
  rows,
}: Props) {
  if (rows) {
    return (
      <textarea
        className="p-2 rounded-sm text-black"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
      />
    );
  }

  return (
    <input
      className="p-2 rounded-sm text-black"
      name={name}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
}
