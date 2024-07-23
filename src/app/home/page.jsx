import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import HrPage from "./components/pageElements/HrPage";
import InternshipPage from "./components/pageElements/InternshipPage";
import MentorPage from "./components/pageElements/MentorPage";
import InternPage from "./components/pageElements/InternPage";

const page = async () => {
  const session = await getServerSession(authOptions);

  // if (session) {
  //   switch (session.user.role) {
  //     case "Admin":
  //       return (
  //         <main className="h-[100vh] w-full overflow-y-scroll p-8">
  //           <HrPage />
  //         </main>
  //       );
  //     case "Training Manager":
  //       return (
  //         <main className="h-[100vh] w-full overflow-y-scroll p-8">
  //           <InternshipPage />
  //         </main>
  //       );
  //     case "Project Manager":
  //       return (
  //         <main className="h-[100vh] w-full overflow-y-scroll p-8">
  //           <MentorPage />
  //         </main>
  //       );
  //     case "Intern":
  //       console.log("Intern");
  //       return (
  //         <main className="h-[100vh] w-full overflow-y-scroll p-8">
  //           <InternPage />
  //         </main>
  //       );
  //     default:
  //       return redirect("404");
  //   }
  // } else {
  //   redirect("/login");
  // }
  if (session) {
    return (
      <main className="h-[100vh] w-full overflow-y-scroll p-8">
        {/* <HrPage /> */}
        <InternPage />
      </main>
    );
  } else {
    redirect("/login");
  }
};

export default page;
