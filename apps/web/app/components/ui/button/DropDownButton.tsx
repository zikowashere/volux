"use client";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type DropDownButtonProps = {
  list: string[];
  placeholder?: string;
  onChange?: (value: string) => void;
};
const DropDownButton = ({
  list,
  placeholder = "Sélectionner",
  onChange,
}: DropDownButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // Ferme le menu au clic en dehors ou sur Échap
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen]);

  const handleSelect = (item: string) => {
    setSelected(item);
    setIsOpen(false);
    onChange?.(item);
  };

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        className="flex w-48 items-center justify-between gap-2 rounded-lg border border-green-950 bg-white px-4 py-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={selected ? "text-black" : "text-gray-500"}>
          {selected ?? placeholder}
        </span>
        <ChevronDown
          className={clsx(
            "h-4 w-4 text-green-950 transition-transform",
            isOpen && "rotate-180",
          )}
        />
      </button>
      {isOpen && (
        <ul
          role="listbox"
          className="absolute left-0 z-10 mt-2 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
        >
          {list.map((item) => (
            <li
              key={item}
              role="option"
              aria-selected={item === selected}
              onClick={() => handleSelect(item)}
              className={clsx(
                "cursor-pointer px-4 py-2 text-gray-800 hover:bg-gray-100",
                item === selected && "bg-green-50 font-medium text-green-950",
              )}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDownButton;
