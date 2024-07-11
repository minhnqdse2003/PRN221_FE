import { Divider } from "@nextui-org/react";
import React from "react";
import { GoProjectSymlink } from "react-icons/go";

const Header = () => {
  return (
    <div>
      <div className="flex flex-row p-6 items-center gap-4">
        <GoProjectSymlink size={24} />
        <span className="flex flex-row">
          <p className="font-semibold text-sm">Project /</p>
          <p className="text-sm">Project 2</p>
        </span>
      </div>
      <Divider />
    </div>
  );
};

export default Header;
