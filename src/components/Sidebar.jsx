"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import {
  MdDashboard,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import { IoFastFoodSharp } from "react-icons/io5";
import { RiUserSettingsFill } from "react-icons/ri";
import { BsCartCheckFill } from "react-icons/bs";
import { GoProjectRoadmap } from "react-icons/go";
import { BsBodyText } from "react-icons/bs";

import { SidebarContext } from "@/context/SidebarContext";
import { usePathname } from "next/navigation";
import UserSection from "./UserSection";
import { useSession } from "next-auth/react";

const iconSize = {
  size: 24,
};

export const sidebarItems = [
  {
    content: "Dashboard",
    href: "/home",
    icon: <MdDashboard {...iconSize} />,
    role: ["Intern"],
  },
  {
    content: "Training Programs Management",
    href: "/trainingprograms",
    icon: <BsBodyText {...iconSize} />,
    role: ["Intern", "Project Manager", "Training Manager", "Admin"],
  },
  {
    content: "Project Management",
    href: "/projects",
    icon: <GoProjectRoadmap {...iconSize} />,
    role: ["Intern", "Project Manager"],
  },
  {
    content: "Intern Management",
    href: "/members",
    icon: <RiUserSettingsFill {...iconSize} />,
    role: ["Admin"],
  },
];

const Sidebar = () => {
  const { collapsed, handleToggle } = useContext(SidebarContext);
  const { data: session } = useSession();
  const pathname = usePathname();
  function isPathMatch(item) {
    if (pathname !== item.href && item.href !== "/") {
      return pathname.startsWith(item.href);
    }
    return pathname === item.href;
  }

  if (pathname === "/login") {
    return;
  }

  const userRole = session?.user?.role || "";

  const filteredSidebarItems = sidebarItems.filter((item) =>
    item.role.includes(userRole)
  );

  return (
    <div
      className={`w-1/5 items-center flex justify-center flex-col h-screen bg-primary text-headline gap-12 transition-all duration-500 overflow-x-hidden ${
        collapsed ? "sidebar-collapse" : ""
      }`}
    >
      <div className={`w-full flex h-4/5 flex-col gap-2`}>
        <div className={`flex justify-between ${collapsed ? "flex-col" : ""}`}>
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
              Intern Managerment System
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
        <ul className="sidebar-ul h-2/3 overflow-y-auto">
          {filteredSidebarItems.map((item) => (
            <li
              key={item.content}
              className="hover:bg-btn w-full transition-all duration-500"
            >
              <Link
                href={item.href}
                className={`sidebar-li ${
                  isPathMatch(item)
                    ? "text-btn hover:text-btn-text border-r-8 border-btn"
                    : ""
                }`}
              >
                <div className={`side-icon`}>{item.icon}</div>
                <p className="side-content">{item.content}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <UserSection
        {...iconSize}
        className={`${collapsed ? "sidebar-collapse" : ""}`}
      />
    </div>
  );
};

export default Sidebar;
