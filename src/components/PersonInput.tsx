import TextField from "./TextField";

interface Props {
  name?: string;
  firstName: string;
  lastName: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export default function PersonInput({
  name,
  firstName,
  lastName,
  onChange,
}: Props) {
  return (
    <div>
      {name && <h3 className="pb-2 text-lg">{name}</h3>}
      <div className="flex gap-2">
        <TextField
          name="firstName"
          placeholder="Firstname"
          value={firstName}
          onChange={onChange}
        />
        <TextField
          name="lastName"
          placeholder="Lastname"
          value={lastName}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
