import React from "react";

type TitleButtonProps = {
  text: string;
  className?: string;
};
const TitleButton = ({ text, className }: TitleButtonProps) => {
  return <p className={className}>{text}</p>;
};

export default TitleButton;
