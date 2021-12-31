import React from "react";

export default function HomeTab({ currentValue, title, onTabChange, value }) {
  return (
    <li className='nav-item'>
      <button
        className={`nav-link ${currentValue === value ? "active" : ""}`}
        onClick={(e) => onTabChange(e.target.value)}
        value={value}
      >
        {title}
      </button>
    </li>
  );
}
