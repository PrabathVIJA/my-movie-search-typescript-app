type inputProps = {
  placeholder: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export default function Input({
  placeholder,
  type,
  value,
  onChange,
}: inputProps) {
  return (
    <>
      <input
        placeholder={placeholder}
        value={value}
        type={type}
        onChange={onChange}
        className="input-field"
      />
    </>
  );
}
