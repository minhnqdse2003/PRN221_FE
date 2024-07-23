import { authOptions } from "@/utils/authOptions";
import DashBoardHeader from "./components/DashBoardHeader";
import DashBoardStoreInformation from "./components/DashBoardStoreInformation";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    switch (session.user.role) {
      case "Admin":
        return redirect("/members");
      case "Training Manager":
        return redirect("/trainingprograms");
      case "Project Manager":
        return redirect("/projects");
      case "Intern":
        return redirect("/home");
      default:
        return redirect("404");
    }
  } else {
    redirect("/login");
  }

  return (
    <main className="overflow-hidden bg-slate-100 p-8 overflow-y-scroll scrollbar-custom h-[100vh] flex flex-col gap-4">
      <DashBoardHeader />
      <DashBoardStoreInformation />
    </main>
  );
}
