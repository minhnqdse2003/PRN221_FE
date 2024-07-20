import React from "react";
import WelcomeBanner from "../ui/WelcomeBanner";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/utils/authOptions";

const InternPage = async () => {

  return (
    <div>
      <WelcomeBanner />
    </div>
  );
};

export default InternPage;
