"use client";
import React, { useState, useEffect } from "react";
import ProjectInformation from "./ProjectInformation";
import ProjectTask from "./ProjectTask";
import { useGetProjects } from "@/data/useProjects";

const ProjectSection = () => {
  const { data: projects, isLoading, error } = useGetProjects(); 
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if ( projects?.data && projects.data.length > 0) {
      console.log("Projects fetched:: ", projects);  // Check projects structure
      setSelectedProject(projects.data[0]); 
      console.log("Initial Selected Project:: ", projects.data[0]);  // Log initial project

    }
  }, [projects]);
  console.log("SelectedProject:", selectedProject);
  if (isLoading) return <div>Project is Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleProjectChange = (event) => {
    const selectedId = event.target.value;
    const project = projects.data.find((proj) => proj.id === selectedId);
    console.log("Changed Project:: ", project);  // Check selected project
    setSelectedProject(project);
  };

  return (
    <div className="p-4 w-full h-100%">
      <p className="text-3xl font-semibold mb-3">Project 2</p>
      <div className="mb-4">
        <label htmlFor="project-select" className="block text-sm font-medium text-gray-700">
          Select a project
        </label>
        <select
          id="project-select"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          value={selectedProject ? selectedProject.id : ""}
          onChange={handleProjectChange}
        >
          {projects && projects.data.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>
      {selectedProject && (
        <div className="w-full flex flex-row">
          <div className="flex w-2/3 flex-col border border-divider bg-white">
            <ProjectTask selectedProject={selectedProject} />
          </div>
          <div className="w-1/3 border border-divider border-l-0 bg-white">
            <ProjectInformation project={selectedProject} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectSection;
