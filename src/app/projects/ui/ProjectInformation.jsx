import React, { useState } from "react";
import { Tabs, Tab, Card, CardBody, Chip, Avatar } from "@nextui-org/react";
import { FaRegAddressCard, FaUser } from "react-icons/fa";
import { MdOutlineDescription, MdManageAccounts } from "react-icons/md";
import { BiDetail } from "react-icons/bi";

const items = [
  {
    name: "Project 2",
    description: "sadasdasdasdas sdasdas",
    leader: "Tran Minh Tan",
    team: ["Tran Quang Huy", "Nguyen Minh Man", "Nguyen Van Tien"],
  },
];
const ProjectInformation = ({ project }) => {
  if (!project) {
    return <div>No project data available</div>;
  }

  return (
    <div className="p-4">
      <Card className="p-4 bg-transparent" shadow="none" radius="none">
        <CardBody>
          <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-8">
              <p className="text-sm flex flex-row items-center gap-2">
                <span className="font-semibold">Name:</span> {project.name}
              </p>
              <p className="text-sm flex flex-row items-center gap-2">
                <span className="font-semibold">Description:</span> {project.description}
              </p>
            </div>
            <div className="flex flex-row gap-8">
              <p className="text-sm flex flex-row items-center gap-2">
                <span className="font-semibold">Leader ID:</span> {project["leader-id"]}
              </p>
              <p className="text-sm flex flex-row items-center gap-2">
                <span className="font-semibold">Start Date:</span> {project["start-date"]}
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProjectInformation;