"use client";
import React from "react";

import ProjectInformation from "./ProjectInformation";
import ProjectTask from "./ProjectTask";

const ProjectSection = () => {
  return (
    <div className="p-4 w-full h-100%">
      <p className="text-3xl font-semibold mb-3">Project 2</p>
      <div className="w-full flex flex-row">
        <div className="flex w-2/3 flex-col border border-divider bg-white">
          <ProjectTask />
        </div>
        <div className="w-1/3 border border-divider border-l-0 bg-white">
          <ProjectInformation />
        </div>
      </div>
    </div>
  );
};

export default ProjectSection;
