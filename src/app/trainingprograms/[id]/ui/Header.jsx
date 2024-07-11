"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Link,
  CircularProgress,
  Divider,
  Chip,
  Avatar,
} from "@nextui-org/react";
import { FaRegAddressCard, FaUser } from "react-icons/fa";
import { MdOutlineDescription } from "react-icons/md";

const data = {
  id: 1,
  title: "AWS For Beginner",
  description:
    "This course belong to whose was wanted to join in training program",
  duration: "24 hours",
  level: "easy",
  completedPercentage: 20,
  user: ["Nguyen Tran My Anh", "Tran Le Anh Thu", "Nguyen Duc Manh"],
  lesson: [
    {
      id: 1,
      title: "EC2",
      description:
        "Learn about Instance Types,CPU Credits,Storage / Volumes, Keypairs,Elastic IP,User Data Scripts,Purchasing Options",
      url: "https://www.facebook.com/",
      resource: "https://www.facebook.com/",
      sequence: 1,
    },
    {
      id: 2,
      title: "EC2",
      description:
        "Learn about Instance Types,CPU Credits,Storage / Volumes, Keypairs,Elastic IP,User Data Scripts,Purchasing Options",
      url: "https://www.facebook.com/",
      resource: "https://www.facebook.com/",
      sequence: 2,
    },
  ],
};

export default function Header() {
  const [isJoined, setIsJoined] = useState(true);

  return (
    <div className="w-full flex flex-row border border-divider px-4">
      <Card className="w-1/2" shadow="none" radius="none">
        <CardHeader className="gap-8 items-center justify-between">
          <div className="flex gap-5">
            <div className="flex flex-row w-full justify-between items-center gap-4">
              <div>
                <h4 className="text-xl font-semibold leading-none text-default-600">
                  {`${data.title} (${data.duration}) - ${
                    data["due-date"] ? data["due-date"] : "Not Yet"
                  }`}
                </h4>
                <h5 className="text-small tracking-tight text-default-400">
                  {data.description}
                </h5>
              </div>

              {data.completedPercentage && (
                <CircularProgress
                  classNames={{
                    svg: "w-16 h-16 drop-shadow-md",
                    indicator: "stroke-black",
                    track: "stroke-black/10",
                    value: "text-sm font-semibold text-black",
                  }}
                  value={data.completedPercentage}
                  strokeWidth={2}
                  showValueLabel={true}
                />
              )}
            </div>
          </div>
          <Button
            className={
              isJoined
                ? "bg-transparent text-foreground border-default-200"
                : ""
            }
            color="primary"
            radius="full"
            size="sm"
            variant={isJoined ? "bordered" : "solid"}
            onPress={() => setIsJoined(!isJoined)}
            isDisabled={!isJoined}
          >
            {isJoined ? "Not Yet" : "Joined"}
          </Button>
        </CardHeader>
        <CardBody className="px-3 py-0 text-small text-default-400">
          {data.lesson.map((item) => (
            <div className="mb-4" key={item.id}>
              <div className="flex flex-row gap-4 items-center">
                <p className="font-semibold text-black text-sm">
                  {item.sequence}
                </p>
                <p className="font-semibold text-black text-sm">{item.title}</p>
                <Link
                  href={item.resource}
                  underline="active"
                  showAnchorIcon
                  isExternal
                  color="primary"
                  className="text-sm"
                >
                  {item.description}
                </Link>
                <Link
                  href={item.url}
                  underline="active"
                  showAnchorIcon
                  isExternal
                  className="text-green-400 text-sm"
                >
                  Reference
                </Link>
              </div>
              <Divider />
            </div>
          ))}
        </CardBody>
        <CardFooter className="gap-3"></CardFooter>
      </Card>
      <div className="border border-divider" />
      <Card className="p-4" shadow="none" radius="none">
        <CardBody>
          <div className="flex flex-col gap-3" key={data.title}>
            <div className="flex flex-row gap-8">
              <p className="text-sm flex flex-row items-center gap-2 font-semibold">
                <FaRegAddressCard /> Name:
              </p>
              <p>{data.title}</p>
            </div>

            <div className="flex flex-row gap-8">
              <p className="text-sm flex flex-row items-center gap-2 font-semibold">
                <MdOutlineDescription /> Description:
              </p>
              <p>{data.description}</p>
            </div>

            <div className="flex flex-row gap-8 items-start">
              <p className="text-sm font-semibold flex flex-row items-center gap-2">
                <FaUser /> Member:
              </p>
              <div className="w-full flex flex-row flex-wrap gap-2">
                {data.user.map((item) => (
                  <Chip
                    variant="flat"
                    avatar={
                      <Avatar
                        name={item}
                        size="sm"
                        getInitials={(name) => name.charAt(0)}
                      />
                    }
                    key={item}
                  >
                    {item}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
