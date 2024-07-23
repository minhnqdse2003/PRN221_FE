"use client";
import React from "react";
import InternTasks from "./InternTasks";
import CardSectionIntern from "./CardSectionIntern";
import { Progress } from "@nextui-org/react";
import { FaBarsProgress } from "react-icons/fa6";
import FeedbackTasks from "./FeedbackTasks";
import { useGetProjects,useGetProject } from "@/data/useProjects";
import {useState, useEffect} from "react";
const WelcomeBanner = () => {
  const { data: projects, isLoading, error } = useGetProjects(); 
  const [projectItems, setProjectItems] = useState([]);
  useEffect(() => {
    if (projects) {
      console.log('projects:', projects);
      setProjectItems(projects.data);
    }
  }, [projects]);
  // if (isLoading) return <div>Project is Loading...</div>;
  if (error) return <div>Error: {error.message}</div>; 
  
  const { data: projectDetail } = useGetProject(projectItems.id);
  console.log(projectDetail);

  // const totalTasks = projectDetail.tasks.reduce((total, task) => total + task.count, 0);

  // const items = [
  //   { name: "Project 1", value: "50", completed: "50", total: "100" },
  //   { name: "Project 2", value: "50", completed: "50", total: "100" },
  //   { name: "Project 3", value: "50", completed: "50", total: "100" },
  //   { name: "Project 4", value: "50", completed: "50", total: "100" },
  //   { name: "Project 5", value: "50", completed: "50", total: "100" },
  //   { name: "Project 6", value: "50", completed: "50", total: "100" },
  // ];
  return (
    <div className="flex gap-4 flex-row">
      <div className="w-3/4 flex flex-col gap-4">
        <CardSectionIntern />
        <InternTasks />
        <FeedbackTasks />
      </div>
      <div className="h-full w-1/4 bg-white rounded-xl p-4 font-semibold">
        <p className="text-2xl font-semibold mb-4">Projects</p>
        <div className="flex flex-col gap-4">
          {(!projects || projects.length === 0 )
          ?           (  <div>No projects available</div>) 
          :(projects.data.map((project, index) => (
            <div
              className="flex flex-col gap-4 p-4 rounded-md bg-slate-50"
              key={project.name}
            >
              <p className="text-xl font-medium">{project.name}</p>
              <div className="flex flex-row justify-between">
                <div className="flex flex-row justify-start gap-2">
                  <FaBarsProgress />
                  <p className="text-sm text-black/40">Progress</p>
                </div>
                <p className="text-sm text-black/40">{`${project.completed}/${project.completed}`}</p>
              </div>

              <Progress
                size="sm"
                classNames={{ indicator: "bg-blue-600" }}
                value={project.value}
              />
            </div>
          )))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
