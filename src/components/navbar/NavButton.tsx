import React from "react";

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  isActive?: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ icon, label, onClick, isActive }) => {
  return (
    <button onClick={onClick}>
      <li
        className={`flex items-center space-x-2 cursor-pointer hover:text-dustyGray p-2 rounded-md ${
          isActive ? "bg-white text-liquidLava" : ""
        }`}
      >
        {icon}
        <span>{label}</span>
      </li>
    </button>
  );
};

export default NavButton;
