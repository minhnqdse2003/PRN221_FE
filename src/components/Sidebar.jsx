"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import {
  MdDashboard,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import { TiContacts } from "react-icons/ti";
import { SidebarContext } from "@/context/SidebarContext";
import { usePathname } from "next/navigation";

const iconSize = {
  size: 24,
};

const sidebarItems = [
  {
    content: "Dashboard",
    href: "/",
    icon: <MdDashboard {...iconSize} />,
  },
  {
    content: "Home",
    href: "/home",
    icon: <AiOutlineHome {...iconSize} />,
  },
  {
    content: "About",
    href: "/about",
    icon: <BsPeople {...iconSize} />,
  },
  {
    content: "Mails",
    href: "/mails",
    icon: <FiMail {...iconSize} />,
  },
  {
    content: "Contacts",
    href: "/contacts",
    icon: <TiContacts {...iconSize} />,
  },
];

const Sidebar = () => {
  const { collapsed, handleToggle } = useContext(SidebarContext);
  const currentRoute = usePathname();
  console.log(currentRoute);

  return (
    <div
      className={`w-1/5 bg-primary text-headline h-screen flex flex-col gap-2 transition-all duration-500 overflow-hidden ${
        collapsed ? "sidebar-collapse" : ""
      }`}
    >
      <div className={`flex ${collapsed ? "flex-col" : ""}`}>
        <Link
          href="/"
          className={`w-50 h-fit flex items-center cursor-pointer p-3`}
        >
          <Image
            alt="Logo"
            src="/logo.png"
            className="object-contain fill-white"
            width={64}
            height={64}
          />
          <p aria-disabled="true" className="side-content">
            Internship Management System
          </p>
        </Link>
        <button
          className={`flex items-center justify-center cursor-pointer hover:bg-btn ${
            collapsed ? "w-100 h-12" : "w-1/6 h-100"
          }`}
          onClick={handleToggle}
        >
          {collapsed ? (
            <MdOutlineKeyboardDoubleArrowRight />
          ) : (
            <MdOutlineKeyboardDoubleArrowLeft />
          )}
        </button>
      </div>
      <ul className="sidebar-ul">
        {sidebarItems.map((item) => (
          <li key={item.content} className="hover:bg-btn w-full">
            <Link
              href={item.href}
              className={`sidebar-li ${
                currentRoute === item.href ? "text-btn hover:text-btn-text" : ""
              }`}
            >
              <div className={`side-icon`}>{item.icon}</div>
              <p className="side-content">{item.content}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
