import { authOptions } from "@/utils/authOptions";
import { redirect } from "next/navigation";
import React from "react";
import HrPage from "./components/pageElements/HrPage";
import InternshipPage from "./components/pageElements/InternshipPage";
import MentorPage from "./components/pageElements/MentorPage";
import InternPage from "./components/pageElements/InternPage";

const page = async () => {
  // const session = await getServerSession(authOptions);

  // if (session) {
  //   switch (session.user.role) {
  //     case "HR Managers":
  //       return <HrPage />;
  //     case "Internship Coordinators":
  //       return <InternshipPage />;
  //     case "Mentors":
  //       return <MentorPage />;
  //     case "Interns":
  //       return <InternPage />;
  //     default:
  //       return redirect("404");
  //   }
  // } else {
  //   redirect("/login");
  // }

  return (
    <main className="h-[100vh] w-full overflow-y-scroll p-8">
      {/* <HrPage /> */}
      <InternPage />
    </main>
  );
};

export default page;
