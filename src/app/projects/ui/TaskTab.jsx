import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";

import { getTodayFormatted } from "@/utils/displayUtils";
import TaskModalAdd from "./TaskModalAdd";
import { RiArrowDropDownLine } from "react-icons/ri";
import {
  Card,
  CardBody,
  Accordion,
  AccordionItem,
  Checkbox,
  Avatar,
  DropdownItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  Button,
  CardHeader,
  useDisclosure,
  Chip,
} from "@nextui-org/react";

const TaskTab = () => {
  const [filterTask, setFilterTask] = useState("My Task");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onClickFilter = (e) => {
    console.log(e);
  };

  const onChangeStatus = (item) => {
    console.log(item);
  };

  const onAddedSubTask = (item) => {
    console.log(item);
  };

  const items = [
    {
      title: "Today",
      count: 3,
      data: [
        {
          name: "Fix bug",
          "due-date": "Today",
          users: [
            "Nguyen Tran Trung Quan",
            "Nguyen Thanh Cong",
            "Nguyen Quoc Thien",
          ],
          "sub-task": [
            {
              name: "Fix bug 2",
              users: [
                "Nguyen Tran Trung Quan",
                "Nguyen Thanh Cong",
                "Nguyen Quoc Thien",
              ],
              "due-date": "Today",
              status: false,
            },
          ],
          status: false,
        },
        {
          name: "Fix bug",
          "due-date": "Today",
          users: [
            "Nguyen Tran Trung Quan",
            "Nguyen Thanh Cong",
            "Nguyen Quoc Thien",
          ],
          "sub-task": [
            {
              name: "Fix bug 2",
              users: [
                "Nguyen Tran Trung Quan",
                "Nguyen Thanh Cong",
                "Nguyen Quoc Thien",
              ],
              "due-date": "Today",
              status: false,
            },
          ],
          status: false,
        },
        {
          name: "Fix bug",
          "due-date": "Today",
          users: [
            "Nguyen Tran Trung Quan",
            "Nguyen Thanh Cong",
            "Nguyen Quoc Thien",
          ],
          "sub-task": [
            {
              name: "Fix bug 2",
              users: [
                "Nguyen Tran Trung Quan",
                "Nguyen Thanh Cong",
                "Nguyen Quoc Thien",
              ],
              "due-date": "Today",
              status: false,
            },
          ],
          status: false,
        },
      ],
    },
    {
      title: "Upcoming",
      count: 3,
      data: [
        {
          name: "Fix bug",
          "due-date": "Today",
          users: [
            "Nguyen Tran Trung Quan",
            "Nguyen Thanh Cong",
            "Nguyen Quoc Thien",
          ],
          "sub-task": [
            {
              name: "Fix bug 2",
              users: [
                "Nguyen Tran Trung Quan",
                "Nguyen Thanh Cong",
                "Nguyen Quoc Thien",
              ],
              "due-date": "Today",
              status: false,
            },
          ],
          status: false,
        },
        {
          name: "Fix bug",
          "due-date": "Today",
          users: [
            "Nguyen Tran Trung Quan",
            "Nguyen Thanh Cong",
            "Nguyen Quoc Thien",
          ],
          "sub-task": [
            {
              name: "Fix bug 2",
              users: [
                "Nguyen Tran Trung Quan",
                "Nguyen Thanh Cong",
                "Nguyen Quoc Thien",
              ],
              "due-date": "Today",
              status: false,
            },
          ],
          status: false,
        },
        {
          name: "Fix bug",
          "due-date": "Today",
          users: [
            "Nguyen Tran Trung Quan",
            "Nguyen Thanh Cong",
            "Nguyen Quoc Thien",
          ],
          "sub-task": [
            {
              name: "Fix bug 2",
              users: [
                "Nguyen Tran Trung Quan",
                "Nguyen Thanh Cong",
                "Nguyen Quoc Thien",
              ],
              "due-date": "Today",
              status: false,
            },
          ],
          status: false,
        },
      ],
    },
    {
      title: "Tomorrow",
      count: 3,
      data: [
        {
          name: "Fix bug",
          "due-date": "Today",
          users: [
            "Nguyen Tran Trung Quan",
            "Nguyen Thanh Cong",
            "Nguyen Quoc Thien",
          ],
          "sub-task": [
            {
              name: "Fix bug 2",
              users: [
                "Nguyen Tran Trung Quan",
                "Nguyen Thanh Cong",
                "Nguyen Quoc Thien",
              ],
              "due-date": "Today",
              status: false,
            },
          ],
          status: false,
        },
        {
          name: "Fix bug",
          "due-date": "Today",
          users: [
            "Nguyen Tran Trung Quan",
            "Nguyen Thanh Cong",
            "Nguyen Quoc Thien",
          ],
          "sub-task": [
            {
              name: "Fix bug 2",
              users: [
                "Nguyen Tran Trung Quan",
                "Nguyen Thanh Cong",
                "Nguyen Quoc Thien",
              ],
              "due-date": "Today",
              status: false,
            },
          ],
          status: false,
        },
        {
          name: "Fix bug",
          "due-date": "Today",
          users: [
            "Nguyen Tran Trung Quan",
            "Nguyen Thanh Cong",
            "Nguyen Quoc Thien",
          ],
          "sub-task": [
            {
              name: "Fix bug 2",
              users: [
                "Nguyen Tran Trung Quan",
                "Nguyen Thanh Cong",
                "Nguyen Quoc Thien",
              ],
              "due-date": "Today",
              status: false,
            },
            {
              name: "Fix bug 2",
              users: [
                "Nguyen Tran Trung Quan",
                "Nguyen Thanh Cong",
                "Nguyen Quoc Thien",
              ],
              "due-date": "Today",
              status: false,
            },
            {
              name: "Fix bug 2",
              users: [
                "Nguyen Tran Trung Quan",
                "Nguyen Thanh Cong",
                "Nguyen Quoc Thien",
              ],
              "due-date": "Today",
              status: true,
            },
          ],
          status: false,
        },
      ],
    },
  ];

  return (
    <Card shadow="none">
      <CardHeader className="flex flex-row justify-between items-center">
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <Button endContent={<RiArrowDropDownLine />}>{filterTask}</Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Filter Actions" variant="flat">
            <DropdownItem
              onClick={onClickFilter}
              key="all_task"
              className="h-14 gap-2"
            >
              All Task
            </DropdownItem>
            <DropdownItem
              onClick={onClickFilter}
              key="my_task"
              className="h-14 gap-2"
            >
              My Task
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Button onPress={onOpen} startContent={<IoIosAdd />}>
          Add Task
        </Button>
        <TaskModalAdd
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
        />
      </CardHeader>
      <CardBody>
        <Accordion defaultExpandedKeys={["1"]}>
          {items?.map((item, index) => (
            <AccordionItem
              key={index}
              aria-label={item.title}
              title={
                <div className="flex flex-row gap-2 items-center">
                  <p className="font-semibold text-md">{item.title}</p>
                  <span className="font-semibold text-sm text-black/50">
                    {item?.title === "Today" ? (
                      <div className="flex flew-row items-center gap-2">
                        <Chip>{getTodayFormatted()}</Chip>
                        <p>{`${item.count} tasks remaining to completed`}</p>
                      </div>
                    ) : (
                      <p>{item.count} tasks remaining to completed</p>
                    )}
                  </span>
                </div>
              }
              classNames={{ content: "flex flex-col gap-4 w-full" }}
            >
              <Accordion>
                {item.data.map((task, index) => (
                  <AccordionItem
                    key={task.name + index}
                    title={
                      <div
                        className="flex flex-row justify-between items-center"
                        key={task.name}
                      >
                        <Checkbox
                          defaultSelected={task.status}
                          onValueChange={() => onChangeStatus(task)}
                          lineThrough
                          title={task.name}
                          classNames={{
                            label:
                              "max-w-full flex flex-row w-full justify-between",
                            wrapper: "after:bg-btn",
                          }}
                        >
                          <p>{task.name}</p>
                        </Checkbox>
                        <p className="text-sm font-semibold">
                          Due {task["due-date"]}
                        </p>
                        <div className="flex -space-x-3 rtl:space-x-reverse">
                          {task.users?.map((user) => (
                            <Avatar
                              name={user}
                              size="sm"
                              key={user}
                              getInitials={(name) => name.charAt(0)}
                            />
                          ))}
                        </div>
                        <div className="flex flex-row gap-2">
                          <Button
                            isIconOnly
                            className="bg-transparent"
                            onClick={() => onAddedSubTask(task)}
                          >
                            <IoIosAdd />
                          </Button>
                          <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                              <Button isIconOnly className="bg-transparent">
                                <BsThreeDotsVertical />
                              </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                              <DropdownItem>Edit</DropdownItem>
                              <DropdownItem>Delete</DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                      </div>
                    }
                  >
                    {task["sub-task"].map((sub, index) => (
                      <div
                        className="flex flex-row justify-between items-center px-12 mb-4"
                        key={sub.name}
                      >
                        <Checkbox
                          defaultSelected={sub.status}
                          lineThrough
                          title={sub.name}
                          onClick={() => onChangeStatus(sub)}
                          classNames={{
                            label:
                              "max-w-full flex flex-row w-full justify-between",
                            wrapper: "after:bg-btn",
                          }}
                        >
                          <p>{sub.name}</p>
                        </Checkbox>
                        <p className="text-sm font-semibold">
                          Due {sub["due-date"]}
                        </p>
                        <div className="flex -space-x-3 rtl:space-x-reverse">
                          {sub.users?.map((user) => (
                            <Avatar
                              name={user}
                              size="sm"
                              key={user}
                              getInitials={(name) => name.charAt(0)}
                            />
                          ))}
                        </div>
                        <Dropdown placement="bottom-end">
                          <DropdownTrigger>
                            <Button isIconOnly className="bg-transparent">
                              <BsThreeDotsVertical />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu>
                            <DropdownItem>Edit</DropdownItem>
                            <DropdownItem>Delete</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    ))}
                  </AccordionItem>
                ))}
              </Accordion>
            </AccordionItem>
          ))}
        </Accordion>
      </CardBody>
    </Card>
  );
};

export default TaskTab;
