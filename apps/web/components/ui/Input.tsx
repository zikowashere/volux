import clsx from "clsx";
import React, { useId } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  suffix?: string;
};
const Input = ({
  label,
  error,
  icon,
  suffix,
  type = "text",
  id,
  className,
  ...props
}: InputProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-black">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <span className="pointer-events-none absolute left-3 text-green-950">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          type={type}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={clsx(
            "w-full  border bg-white px-4 py-2 text-black placeholder:text-gray-500 outline-none transition-colors focus:ring-2 focus:ring-green-600 disabled:cursor-not-allowed disabled:bg-gray-100",
            error ? "border-red-600" : "border-green-950",
            icon && "pl-10",
            suffix && "pr-20",
            className,
          )}
          {...props}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3 text-sm text-gray-500">
            {suffix}
          </span>
        )}
      </div>
      {error && (
        <p id={errorId} className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
