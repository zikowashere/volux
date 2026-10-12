"use client";
import clsx from "clsx";
import { useState } from "react";

type ButtonRadioProps = {
  name: string;
  list: string[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
};
const ButtonRadio = ({
  name,
  list,
  defaultValue,
  onChange,
  className,
}: ButtonRadioProps) => {
  const [selected, setSelected] = useState(defaultValue ?? null);

  const handleChange = (item: string) => {
    setSelected(item);
    onChange?.(item);
  };

  return (
    <div role="radiogroup" className={clsx("flex flex-wrap gap-2", className)}>
      {list.map((item) => (
        <label
          key={item}
          className={clsx(
            " flex flex-row flex-1 justify-between cursor-pointer rounded-lg border px-4 py-2 transition-colors has-focus-visible:ring-2 has-focus-visible:ring-green-600 has-focus-visible:ring-offset-2",
            item === selected
              ? "border-green-700 bg-green-700 font-medium text-white"
              : "border-green-950 bg-white text-black hover:bg-green-50",
          )}
        >
          <input
            type="radio"
            name={name}
            value={item}
            checked={item === selected}
            onChange={() => handleChange(item)}
            className="sr-only"
          />
          {item}
        </label>
      ))}
    </div>
  );
};

export default ButtonRadio;
