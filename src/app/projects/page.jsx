import React from "react";
import Header from "./ui/Header";
import ProjectSection from "./ui/ProjectSection";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/utils/authOptions";


const page = async () => {
  const session = await getServerSession(authOptions);

  if (session && session?.user.role !== "Intern") {
    redirect(404);
  }
  return (
    <div className="h-[100vh] overflow-y-scroll">
      <Header />
      <ProjectSection />
    </div>
  );
};

export default page;
