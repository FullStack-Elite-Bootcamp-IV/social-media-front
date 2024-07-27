import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon, label, onClick }) => {
  const pathname = usePathname();

  return (
    <Link href={href}>
      <li
        className={`flex items-center space-x-2 cursor-pointer hover:text-slate-800 p-2 rounded-md ${
          pathname === href ? "bg-white text-liquidLava" : ""
        }`}
        onClick={onClick}
      >
        {icon}
        <span className="font-medium">{label}</span>
      </li>
    </Link>
  );
};

export default NavItem;
