import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import ReportModalAdd from "./ReportModalAdd";
import { IoIosAdd } from "react-icons/io";
import { useGetProject } from "@/data/useProjects";

const ReportsTab = ({ selectedProject }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [workReports, setWorkReports] = useState([]);
  const { data: projectDetails, isLoading, error } = useGetProject(selectedProject.id);

  useEffect(() => {
    if (projectDetails) {
      setWorkReports(projectDetails["work-reports"]);
    }
  }, [projectDetails]);

  const getColor = (status) => {
    switch (status) {
      case "Accepted":
        return "success";
      case "Rejected":
        return "danger";
      case "Pending":
        return "warning";
      default:
        return "default";
    }
  };

  if (isLoading) return <div>Loading work reports...</div>;
  if (error) return <div>Error loading work reports: {error.message}</div>;

  return (
    <div className="flex flex-col gap-4 bg-white p-6 rounded-xl">
      <div className="flex flex-row justify-between">
        <p className="font-semibold text-xl">Work Report</p>
        <Button onPress={onOpen} startContent={<IoIosAdd />}>
          Add Report
        </Button>
        <ReportModalAdd
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          projectId={projectDetails.detail.id}
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {workReports.map((item, index) => (
          <Card key={index} isPressable>
            <CardHeader className="flex gap-3">
              <div className="flex flex-row justify-between w-full">
                <p className="text-md text-blue-600 font-bold underline">
                  {item.name}
                </p>
                <Chip color={getColor(item.status)} radius="sm">
                  {item.status}
                </Chip>
              </div>
            </CardHeader>
            <CardBody className="justify-end gap-4">
              <p className="text-sm font-medium text-black/80">
                {item["content-report"]}
              </p>
              <div className="flex flex-row justify-between">
                <Chip
                  variant="flat"
                  avatar={
                    <Avatar
                      name={item.user}
                      size="sm"
                      getInitials={(name) => name.charAt(0)}
                    />
                  }
                  key={item.user}
                >
                  {item.user}
                </Chip>
                <div className="text-sm text-black/40">{item.date}</div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReportsTab;
