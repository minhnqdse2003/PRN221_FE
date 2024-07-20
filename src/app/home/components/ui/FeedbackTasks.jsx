import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Chip,
  Avatar,
} from "@nextui-org/react";

const FeedbackTasks = () => {
  const items = [
    {
      name: "Project 1",
      content:
        "Not Available dasdasdasd asd asd asd asd a da dasd as dasdasdasdasd sa dasd sadasdasdasdasd",
      status: "Accepted",
      user: "Nguyen Thanh Cong",
      date: "Yesterday,6:04 PM",
    },
    {
      name: "Project 2",
      content: "Not Available",
      status: "Rejected",
      user: "Nguyen Thanh Cong",
      date: "Today,6:04 PM",
    },
    {
      name: "Project 3",
      content: "Not Available",
      status: "Accepted",
      user: "Nguyen Thanh Cong",
      date: "12-02-2024,6:04 PM",
    },
    {
      name: "Project 4",
      content: "Not Available",
      status: "Pending",
      user: "Nguyen Thanh Cong",
      date: "12-02-2024,6:04 PM",
    },
    {
      name: "Project 5",
      content: "Not Available",
      status: "Rejected",
      user: "Nguyen Thanh Cong",
      date: "12-02-2024,6:04 PM",
    },
    {
      name: "Project 6",
      content: "Not Available",
      status: "Pending",
      user: "Nguyen Thanh Cong",
      date: "12-02-2024,6:04 PM",
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
      {items.length === 0 ? (
        <div className="text-center text-gray-500">No Report Found</div>
      ) : (
      <div className="grid grid-cols-3 gap-4" > 
        {items.map((item, index) => (  
          <Card  key={item.name}>
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
                {item.content}
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
      </div> )}
      </div>
  );
};

export default FeedbackTasks;
