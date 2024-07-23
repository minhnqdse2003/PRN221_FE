"use client";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Input,
  DatePicker,
} from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import ProjectInformation from "./ProjectInformation";
import ProjectTask from "./ProjectTask";
import ProjectModalAdd from "./ProjectModalAdd"
import { useGetProjects } from "@/data/useProjects";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProjectSection = () => {
  const { data: projects, isLoading, error } = useGetProjects(); 
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    if ( projects?.data && projects.data.length > 0) {
      setSelectedProject(projects.data[0]); 

    }
  }, [projects]);
  if (isLoading) return <div>Project is Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleProjectChange = (event) => {
    const selectedId = event.target.value;
    const project = projects.data.find((proj) => proj.id === selectedId);
    setSelectedProject(project);
  };

  const handleModalOpenChange = (isOpen) => {
    setIsModalOpen(isOpen);
  };

  return (
    <div className="p-4 w-full h-100%">
      <p className="text-3xl font-semibold mb-3">Project {selectedProject ? selectedProject.name : ""}</p>
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
              <div className="flex flex-wrap gap-2">{project.name}</div>
            </option>
          ))}
        </select>
        <Button onPress={() => setIsModalOpen(true)} className="ml-2">
          Add Project
        </Button>
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
            <ProjectModalAdd isOpen={isModalOpen} onOpenChange={handleModalOpenChange} />
    </div>
  );
};

export default ProjectSection;
