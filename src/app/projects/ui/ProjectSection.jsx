"use client";
import React from "react";

import ProjectInformation from "./ProjectInformation";
import ProjectTask from "./ProjectTask";

const ProjectSection = () => {
  return (
    <div className="p-4 w-full">
      <p className="text-3xl font-semibold mb-3">Project 2</p>
      <div className="w-full flex flex-row">
        <div className="flex w-3/4 flex-col border border-divider bg-white">
          <ProjectTask />
        </div>
        <div className="w-1/4 border border-divider border-l-0 bg-white">
          <ProjectInformation />
        </div>
      </div>
    </div>
  );
};

export default ProjectSection;
