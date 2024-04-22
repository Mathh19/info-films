type InputRadioProps = {
  text: string;
  name: string;
  id: string;
};

export const InputRadio = ({ text, id, name }: InputRadioProps) => {
  return (
    <label htmlFor={id} className="flex cursor-pointer">
      <input
        type="radio"
        id={id}
        name={name}
        className="peer appearance-none"
      />
      <div className="peer-checked:bg-background-secondary w-full rounded px-2 py-1 text-lg font-bold">
        {text}
      </div>
    </label>
  );
};
