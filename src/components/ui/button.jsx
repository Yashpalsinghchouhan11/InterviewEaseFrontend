// src/components/ui/Button.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Button({
  children,
  to,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
}) {
  const base =
    "rounded-md font-medium transition duration-200 focus:outline-none";

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const variants = {
    primary: "bg-[#9381FF] text-white hover:bg-[#3A86FF]",
    outline:
      "border border-[#9381FF] text-[#9381FF] hover:bg-[#3A86FF] hover:text-white",
    danger:
      "border border-red-500 text-red-500 hover:bg-red-500 hover:text-white",
  };

  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
