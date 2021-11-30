import React from "react";
import { ReactComponent as GhostSVG } from "./ghost.svg";
import "./style.css";

interface Props {
  message?: string;
}

export const Ghost: React.FC<Props> = ({ message }) => {
  return (
    <div className="ghost-container">
      <GhostSVG />
      <p className="message">{message || "Nothing found"}</p>
    </div>
  );
};
