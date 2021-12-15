import { Field } from "formik";

interface Props {
  name: string;
  value: string;
  label: string;
}
export default function CheckboxGroupField({ name, value, label }: Props) {
  return (
    <label className="flex gap-2 items-center">
      <Field type="checkbox" name={name} value={value} />
      {label}
    </label>
  );
}
