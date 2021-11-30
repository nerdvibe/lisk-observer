import React from "react";

interface Props {
  text: string;
  icon?: string;
}

export const CardData = ({ text, icon }: Props) => (
  <div className="block-card-value">
    {icon ? <i className={`app-icons ${icon} font-xxl mr-2`} /> : null}
    {text}
  </div>
);
