import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Input,
  Autocomplete,
  AutocompleteItem,
  Avatar,
  RadioGroup,
  Radio,
  DatePicker,
} from "@nextui-org/react";
import React, { useState } from "react";

const TaskModalAdd = (props) => {
  const { isOpen, onOpenChange } = props;
  const [selected, setSelected] = useState("today");
  const users = [
    {
      id: 1,
      name: "Tony Reichert",
      role: "CEO",
      team: "Management",
      status: "active",
      age: "29",
      avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png",
      email: "tony.reichert@example.com",
    },
    {
      id: 2,
      name: "Zoey Lang",
      role: "Tech Lead",
      team: "Development",
      status: "paused",
      age: "25",
      avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/1.png",
      email: "zoey.lang@example.com",
    },
    {
      id: 3,
      name: "Jane Fisher",
      role: "Sr. Dev",
      team: "Development",
      status: "active",
      age: "22",
      avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/2.png",
      email: "jane.fisher@example.com",
    },
    {
      id: 4,
      name: "William Howard",
      role: "C.M.",
      team: "Marketing",
      status: "vacation",
      age: "28",
      avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png",
      email: "william.howard@example.com",
    },
    {
      id: 5,
      name: "Kristen Copper",
      role: "S. Manager",
      team: "Sales",
      status: "active",
      age: "24",
      avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/3.png",
      email: "kristen.cooper@example.com",
    },
    {
      id: 6,
      name: "Brian Kim",
      role: "P. Manager",
      team: "Management",
      age: "29",
      avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/3.png",
      email: "brian.kim@example.com",
      status: "Active",
    },
    {
      id: 7,
      name: "Michael Hunt",
      role: "Designer",
      team: "Design",
      status: "paused",
      age: "27",
      avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/4.png",
      email: "michael.hunt@example.com",
    },
    {
      id: 8,
      name: "Samantha Brooks",
      role: "HR Manager",
      team: "HR",
      status: "active",
      age: "31",
      avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/4.png",
      email: "samantha.brooks@example.com",
    },
    {
      id: 9,
      name: "Frank Harrison",
      role: "F. Manager",
      team: "Finance",
      status: "vacation",
      age: "33",
      avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/5.png",
      email: "frank.harrison@example.com",
    },
    {
      id: 10,
      name: "Emma Adams",
      role: "Ops Manager",
      team: "Operations",
      status: "active",
      age: "35",
      avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/5.png",
      email: "emma.adams@example.com",
    },
  ];

  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      radius="lg"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add Task</ModalHeader>
            <ModalBody>
              <Input autoFocus label="Task Title" />
              <Autocomplete
                defaultItems={users}
                variant="bordered"
                label="Assigned to"
                placeholder="Select a user"
                labelPlacement="inside"
                className="w-full font-semibold"
                classNames={{ listboxWrapper: "bg-white" }}
              >
                {(user) => (
                  <AutocompleteItem key={user.id} textValue={user.name}>
                    <div className="flex gap-2 items-center">
                      <Avatar
                        name={user.name}
                        size="sm"
                        key={user.name}
                        getInitials={(name) => name.charAt(0)}
                      />
                      <div className="flex flex-col">
                        <span className="text-small">{user.name}</span>
                        <span className="text-tiny text-default-400">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </AutocompleteItem>
                )}
              </Autocomplete>
              <RadioGroup
                value={selected}
                onValueChange={setSelected}
                label="Due Date"
                orientation="horizontal"
              >
                <Radio value="today">Today</Radio>
                <Radio value="upcoming">UpComing</Radio>
                <Radio value="tomorrow">Tomorrow</Radio>
                <Radio value="no-deadline">No Deadline</Radio>
                <Radio value="customize">Customize....</Radio>
              </RadioGroup>
              {selected === "customize" && (
                <DatePicker
                  classNames={{
                    calendarContent: "bg-white",
                  }}
                  popoverProps={{
                    placement: "bottom-start",
                  }}
                  label="Birth date"
                  className="max-w-[284px]"
                />
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="foreground" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button className="bg-btn text-white" onPress={onClose}>
                Add
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default TaskModalAdd;
