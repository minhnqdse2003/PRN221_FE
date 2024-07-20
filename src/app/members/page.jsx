import React from "react";
import MemberTable from "./ui/MemberTable";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/utils/authOptions";




const page = async () => {
  const session = await getServerSession(authOptions);
  if (session && session?.user.role !== "Admin") {
    redirect(404);
  }
  return (
    <div className="p-8">
      <MemberTable />
    </div>
  );
};

export default page;
