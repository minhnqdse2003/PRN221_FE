import React from "react";
import Header from "./ui/Header";
import TrainingProgramTable from "./ui/TrainingProgramTable";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/utils/authOptions";


const session = await getServerSession(authOptions);



const page = async () => {
  const session = await getServerSession(authOptions);

  if (session && session?.user.role == "Intern") {
    redirect(404);
  }
  
  return (
    <div>
      <Header />
      <div className="px-14 mt-8">
        <TrainingProgramTable />
      </div>
    </div>
  );
};

export default page;
