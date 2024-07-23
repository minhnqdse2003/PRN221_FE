import React from "react";
import Header from "./ui/Header";
import { FaBook } from "react-icons/fa";
import { Divider } from "@nextui-org/react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/utils/authOptions";


const page = async () => {
  const session = await getServerSession(authOptions);

  if (session && session?.user.role == "Intern") {
    redirect("/home");
  }
  return (
    <div>
      <div className="flex flex-row p-6 items-center gap-4">
        <FaBook size={24} />
        <span className="flex flex-row">
          <p className="font-semibold text-sm">Training Program / </p>
          <p className="text-sm">Project 2</p>
        </span>
      </div>
      <Header />
    </div>
  );
};

export default page;
