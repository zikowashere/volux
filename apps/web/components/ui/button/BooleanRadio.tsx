"use client";
import { useState } from "react";
import ButtonRadio from "./ButtonRadio";

type BooleanRadioProps = {
  name: string;
  defaultValue?: boolean;
  onChange?: (value: boolean) => void;
  trueLabel?: string;
  falseLabel?: string;
  className?: string;
};
const BooleanRadio = ({
  name,
  defaultValue,
  onChange,
  trueLabel = "Oui",
  falseLabel = "Non",
  className,
}: BooleanRadioProps) => {
  const [value, setValue] = useState<boolean | null>(defaultValue ?? null);

  const handleChange = (label: string) => {
    const next = label === trueLabel;
    setValue(next);
    onChange?.(next);
  };

  return (
    <>
      <ButtonRadio
        name={`${name}-label`}
        list={[trueLabel, falseLabel]}
        defaultValue={
          defaultValue === undefined
            ? undefined
            : defaultValue
              ? trueLabel
              : falseLabel
        }
        onChange={handleChange}
        className={className}
      />
      {/* Envoie "true" / "false" avec le formulaire */}
      {value !== null && (
        <input type="hidden" name={name} value={String(value)} />
      )}
    </>
  );
};

export default BooleanRadio;
