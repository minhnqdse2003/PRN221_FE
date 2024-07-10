import React from "react";
import Header from "./ui/Header";
import ProjectSection from "./ui/ProjectSection";

const page = () => {
  return (
    <div className="h-[100vh] overflow-y-scroll">
      <Header />
      <ProjectSection />
    </div>
  );
};

export default page;
