import { Divider } from "@nextui-org/react";
import React from "react";
import { FaBook } from "react-icons/fa";

const Header = () => {
  return (
    <div>
      <div className="flex flex-row p-6 items-center gap-4">
        <FaBook size={24} />
        <span className="flex flex-row">
          <p className="font-semibold text-sm">Training Program / </p>
          <p className="text-sm">Project 2</p>
        </span>
      </div>
      <Divider />
    </div>
  );
};

export default Header;
