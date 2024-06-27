import React, { useState } from "react";
import { Tabs, Tab, Card, CardBody, Chip, Avatar } from "@nextui-org/react";
import { FaRegAddressCard, FaUser, FaRegUser } from "react-icons/fa";
import { MdOutlineDescription, MdManageAccounts } from "react-icons/md";

const items = [
  {
    name: "Project 2",
    description: "sadasdasdasdas sdasdas",
    leader: "Tran Minh Tan",
    team: ["Tran Quang Huy", "Nguyen Minh Man", "Nguyen Van Tien"],
  },
];

const ProjectInformation = () => {
  const [selected, setSelected] = useState("details");
  return (
    <Tabs
      aria-label="Options"
      selectedKey={selected}
      onSelectionChange={setSelected}
      variant="underlined"
      classNames={{
        tabList:
          "w-full relative rounded-none p-0 border-b border-divider pl-4",
        tab: "max-w-fit px-0 h-12",
      }}
      className="w-full"
    >
      <Tab key="details" title="Details">
        <Card className="p-4 bg-transparent" shadow="none" radius="none">
          <CardBody>
            {items.map((item, index) => (
              <div className="flex flex-col gap-3" key={item.name}>
                <div className="flex flex-row gap-8">
                  <p className="text-sm flex flex-row items-center gap-2">
                    <FaRegAddressCard /> Name
                  </p>
                  <p>{item.name}</p>
                </div>

                <div className="flex flex-row gap-8">
                  <p className="text-sm flex flex-row items-center gap-2">
                    <MdOutlineDescription /> Description
                  </p>
                  <p>{item.description}</p>
                </div>

                <div className="flex flex-row gap-8">
                  <p className="text-sm flex flex-row items-center gap-2">
                    <MdManageAccounts /> Leader
                  </p>
                  <p>{item.leader}</p>
                </div>

                <div className="flex flex-row gap-8 items-start">
                  <p className="text-sm flex flex-row items-center gap-2">
                    <FaUser /> Team
                  </p>
                  <div className="w-full flex flex-row flex-wrap">
                    {item.team.map((item) => (
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
            ))}
          </CardBody>
        </Card>
      </Tab>
    </Tabs>
  );
};

export default ProjectInformation;
