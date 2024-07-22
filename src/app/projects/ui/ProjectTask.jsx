"use client";
import React, { useState,useEffect } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { FaTasks } from "react-icons/fa";
import { RiTeamLine } from "react-icons/ri";
import { TbReport } from "react-icons/tb";
import TaskTab from "./TaskTab";
import TeamTab from "./TeamTab";
import ReportsTab from "./ReportsTab";

const ProjectTask = ({ selectedProject }) => {
  console.log("ProjectTask", selectedProject);
  const [selected, setSelected] = useState("tasks");

  return (
    <Tabs
      aria-label="Options"
      selectedKey={selected}
      onSelectionChange={setSelected}
      variant="underlined"
      classNames={{
        tabList:
          "gap-6 w-full relative rounded-none p-0 border-b border-divider pl-4",
        tab: "max-w-fit px-0 h-12",
      }}
    >
      <Tab
        key="tasks"
        title={
          <div className="flex items-center space-x-2">
            <FaTasks />
            <span className="font-semibold">Task</span>
          </div>
        }
      >
          <TaskTab project={selectedProject}/>
      </Tab>
      <Tab
        key="team"
        title={
          <div className="flex items-center space-x-2">
            <RiTeamLine />
            <span className="font-semibold">Team</span>
          </div>
        }
      >
        <TeamTab selectedProject={selectedProject} />
      </Tab>
      <Tab
        key="reports"
        title={
          <div className="flex items-center space-x-2">
            <TbReport />
            <span className="font-semibold">Reports</span>
          </div>
        }
      >
        <ReportsTab selectedProject={selectedProject} />
      </Tab>
    </Tabs>
  );
};

export default ProjectTask;
