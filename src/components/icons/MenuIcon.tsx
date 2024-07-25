import React from "react";

interface Props {
  className?: string;
  fill?: string;
  strokeWidth?: number;
  stroke?: string;
}

const MenuIcon = (props: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={props.fill || "none"}
      viewBox="0 0 24 24"
      strokeWidth={props.strokeWidth || 1.5}
      stroke={props.stroke || "currentColor"}
      className={props.className || "size-6"}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
};

export default MenuIcon;
