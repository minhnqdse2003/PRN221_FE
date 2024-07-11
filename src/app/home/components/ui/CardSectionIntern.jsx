import { Card, CardBody, CardHeader } from "@nextui-org/react";
import React from "react";

import { FaProjectDiagram, FaTasks } from "react-icons/fa";
import { IoToday } from "react-icons/io5";

const CardSectionIntern = () => {
  const list = [
    {
      title: "Total Project",
      quantity: 50,
      icon: <FaProjectDiagram size={26} />,
    },
    {
      title: "Task Completed",
      quantity: 25,
      icon: <FaTasks size={26} />,
    },
    {
      title: "Today Task",
      quantity: 15,
      icon: <IoToday size={26} />,
    },
  ];
  return (
    <div className="gap-8 grid grid-cols-2 sm:grid-cols-3">
      {list.map((item, index) => (
        <Card
          shadow="lg"
          key={index}
          isPressable
          onPress={() => console.log("item pressed")}
          className="bg-blue-600 text-white py-4 flex flex-row items-center justify-around"
        >
          <div>
            <CardHeader className="overflow-visible px-4 items-start text-4xl font-extrabold">
              {item.quantity}
            </CardHeader>
            <CardBody className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-sm uppercase font-semibold">{item.title}</p>
            </CardBody>
          </div>
          <div className="rounded-full bg-white text-blue-600 p-4">
            {item.icon}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CardSectionIntern;
