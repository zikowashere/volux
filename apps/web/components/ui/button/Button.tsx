import clsx from "clsx";
import React from "react";

type ButtonProps = {
  text: string;
  icon?: React.ReactNode;
  backgroundColor?: string;
  forgroundColor?: string;
  textColor?: string;
  className?: string;
  onclick?: () => void;
};
const Button = ({
  text,
  icon,
  backgroundColor,
  forgroundColor,
  textColor,
  className,
  onclick,
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        `flex items-center gap-2 rounded-lg bg-gradient-to-r  px-4 py-2 ${textColor || "text-white"} ${backgroundColor} ${className}`,
        { "is-hovered": forgroundColor === "hover" },
      )}
      onClick={onclick}
    >
      {icon && <span>{icon}</span>}
      {text}
    </button>
  );
};

export default Button;
