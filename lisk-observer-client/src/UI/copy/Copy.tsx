import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./style.css";

interface CopyProps {
  text: string;
  className?: string;
}

export const Copy = ({ text, className }: CopyProps) => {
  const copyText = () => {
    const el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  return (
    <FontAwesomeIcon
      className={`fa copy-button ${className}`}
      icon={["fas", "copy"]}
      onClick={copyText}
    />
  );
};
