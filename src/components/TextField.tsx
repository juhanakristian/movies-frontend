type OnChangeFn = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => void;

interface Props {
  field: any;
  form: any;
  rows?: number;
  label: string;
}

export default function TextField({
  field,
  form: { touched, errors },
  rows,
  ...props
}: Props) {
  if (rows) {
    return (
      <textarea
        className="p-2 rounded-sm text-black"
        rows={rows}
        {...field}
        {...props}
      />
    );
  }

  return (
    <>
      {props.label && (
        <label htmlFor={field.name} className="text-white text-md">
          {props.label}
        </label>
      )}
      <input className="p-2 rounded-sm text-black" {...field} {...props} />
    </>
  );
}
