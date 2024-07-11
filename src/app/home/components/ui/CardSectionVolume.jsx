import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { FaUserAlt } from "react-icons/fa";

const list = [
  {
    title: "Developer",
    quantity: 50,
  },
  {
    title: "Internship",
    quantity: 25,
  },
  {
    title: "Project Management",
    quantity: 15,
  },
];
const CardSectionVolume = () => {
  return (
    <div className="gap-8 grid grid-cols-2 sm:grid-cols-3">
      {list.map((item, index) => (
        <Card
          shadow="md"
          key={index}
          onPress={() => console.log("item pressed")}
          className="flex flex-row items-center justify-center gap-4 bg-blue-600 text-white px-4 py-8"
        >
          <div className="h-fit">
            <CardHeader className="flex-col items-start p-0 pb-2">
              <p className="text-4xl font-medium">{item.quantity}</p>
            </CardHeader>
            <CardBody className="items-start p-0">
              <p className="text-xl font-semibold">{item.title}</p>
            </CardBody>
          </div>
          <div className="rounded-full bg-white text-blue-600 p-4">
            <FaUserAlt size={26} />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CardSectionVolume;
