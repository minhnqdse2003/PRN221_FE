import React from "react";
import { Card, CardHeader, CardBody, Divider, Chip } from "@nextui-org/react";

const FeedbackTasks = () => {
  const items = [
    {
      name: "Project 1",
      content:
        "Not Available dasdasdasd asd asd asd asd a da dasd as dasdasdasdasd sa dasd sadasdasdasdasd",
      status: "Accepted",
    },
    {
      name: "Project 1",
      content: "Not Available",
      status: "Rejected",
    },
    {
      name: "Project 1",
      content: "Not Available",
      status: "Accepted",
    },
    {
      name: "Project 1",
      content: "Not Available",
      status: "Pending",
    },
    {
      name: "Project 1",
      content: "Not Available",
      status: "Rejected",
    },
    {
      name: "Project 1",
      content: "Not Available",
      status: "Pending",
    },
  ];
  const getColor = (status) => {
    switch (status) {
      case "Accepted":
        return "success";
      case "Rejected":
        return "danger";
      case "Pending":
        return "warning";
    }
  };
  return (
    <div className="flex flex-col gap-4 bg-white p-6 rounded-xl">
      <p className="font-semibold text-2xl">Work Report</p>
      <div className="flex flex-row gap-6 px-8 flex-wrap">
        {items.map((item, index) => (
          <Card className="w-[250px]" key={item.name}>
            <CardHeader className="flex gap-3">
              <div className="flex flex-row justify-between w-full">
                <p className="text-md text-blue-600 font-medium">{item.name}</p>
                <Chip color={getColor(item.status)} radius="sm">
                  {item.status}
                </Chip>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>{item.content}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeedbackTasks;
