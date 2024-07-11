import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  CircularProgress,
} from "@nextui-org/react";

const list = [
  {
    title: "Acceptance Rate",
    quantityPercent: 50,
    quantity: 5000,
  },
  {
    title: "Completion Rate",
    quantityPercent: 25,
    quantity: 2500,
  },
];

const CardSectionRate = () => {
  return (
    <div className="gap-8 grid grid-cols-2 sm:grid-cols-2">
      {list.map((item, index) => (
        <Card
          shadow="sm"
          isHoverable
          isBlurred
          key={index}
          className="gap-4 py-4"
          isPressable
          onPress={() => console.log("item pressed")}
        >
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
            <p className="text-large uppercase font-semibold">{item.title}</p>
          </CardHeader>
          <CardBody className="overflow-visible p-0 items-center">
            <CircularProgress
              classNames={{
                svg: "w-36 h-36 drop-shadow-md",
                indicator: "stroke-black",
                track: "stroke-black/10",
                value: "text-3xl font-semibold text-black",
              }}
              value={item.quantityPercent}
              strokeWidth={4}
              showValueLabel={true}
            />
          </CardBody>
          <CardFooter className="justify-center items-center pt-0">
            <Chip
              classNames={{
                base: "border-1 border-black/30",
                content: "text-black/90 text-small font-semibold",
              }}
              variant="bordered"
            >
              {item.quantity + " " + item.title}`
            </Chip>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default CardSectionRate;
