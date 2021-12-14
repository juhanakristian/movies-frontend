interface Props {
  type?: "button" | "submit";
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function Button({ children, onClick, type = "button" }: Props) {
  return (
    <button
      className="bg-purple-500 text-white text-sm p-2 rounded-md uppercase font-semibold"
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
