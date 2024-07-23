import React, { useState, useEffect } from "react";
import { IoIosAdd } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";

import { getTodayFormatted } from "@/utils/displayUtils";
import TaskModalAdd from "./TaskModalAdd";
import CreateSubTaskModal from "./SubTaskModelAdd";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useCreateSubTask, useDeleteSubTask, useUpdateSubTask } from "@/data/useSubTask";
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
import { useGetProject } from "@/data/useProjects";
import {useDeleteTask, useUpdateTask} from "@/data/useTask";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TaskModalEdit from "./TaskModalEdit";

const TaskTab = ({ project }) => {
  const [filterTask, setFilterTask] = useState("My Task");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: isEditModalOpen, onOpen: onOpenEditModal, onOpenChange: onEditModalOpenChange } = useDisclosure();
  const [projectTask, setProjectTask] = useState([]);
  const [isSubTaskModalOpen, setSubTaskModalOpen] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);
  const { data: projectDetails, isLoading, error } = useGetProject(project.id);
  const { mutate: createSubTask } = useCreateSubTask();
  const { mutate: deleteTask } = useDeleteTask();
  const { mutate: deleteSubTask } = useDeleteSubTask();
  const { mutate: updateTask } = useUpdateTask();
  const { mutate: updateSubTask } = useUpdateSubTask();




  useEffect(() => {
    if (projectDetails) {
      setProjectTask(projectDetails.tasks);
    }
  }, [projectDetails]);

  if (isLoading) return <div>Loading project tasks...</div>;
  if (error) return <div>Error loading project tasks</div>;

  const onClickFilter = (e) => {
  };

  const onChangeStatus = (task) => {
    const newStatus = task.status === 'Done' ? 'On Processing' : 'Done';
    const taskData = {
      id: task.id,
      name: task.name,
      description: task.description, 
      status: newStatus,
      priority: task.priority,
    };


    updateTask(taskData,{
      onSuccess : (data ) => (
        toast.success("Task has been update!")
      ),
    })
  };
  const onChangeSubStatus = (sub) => {
    const newStatus = task.status === 'Done' ? 'On Processing' : 'Done';
    const subTaskData = {
      "task-id": sub['task-id'],
      description: sub.description,
      "due-date": sub['due-date'],
      "assign-user-id": sub['assign-user-id'],
      status: newStatus,
      name: sub.name,
    }
    updateSubTask(subTaskData,{
      onSuccess: (data) => (
        toast.success("Sub Task has been update!")
      )
    })

  }

  const onAddedSubTask = (taskId) => {
    setCurrentTaskId(taskId);
    setSubTaskModalOpen(true);
  };

  const handleAddSubTask = (subTaskData) => {
    createSubTask(subTaskData, {
      onSuccess: () => {
        toast.success("Task has been created! ");
      },
    });
  };
  const handleEditTask = (task) => {
    setCurrentTask(task); 
    onOpenEditModal(); 
  }
  const handleDeleteTask = (taskId) => {
    deleteTask(taskId, {
      onSuccess: (data) => {
        toast.success("Task has been deleted ");
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      },
    });
  };
  const handleDeleteSubTask = (subId) => {
    deleteSubTask(subId, {
      onSuccess: (data) => {
        toast.success("Sub Task has been deleted ");
      },
    });
  };
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
          projectId={project.id}
        />
        <CreateSubTaskModal
          isOpen={isSubTaskModalOpen}
          onOpenChange={setSubTaskModalOpen}
          taskId={currentTaskId}
          onCreateSubTask={handleAddSubTask}
          projectId={project.id}
        />
        <TaskModalEdit isOpen={isEditModalOpen} onOpenChange={onEditModalOpenChange} projectId={project.id} task={currentTask} />

      </CardHeader>
      <CardBody>
        <Accordion defaultExpandedKeys={["1"]}>
          {projectTask.map((category, index) => (
            <AccordionItem
              key={index}
              aria-label={category.title}
              title={
                <div className="flex flex-row gap-2 items-center">
                  <p className="font-semibold text-md">{category.title}</p>
                  <span className="font-semibold text-sm text-black/50">
                    {category.title === "Today" ? (
                      <div className="flex flew-row items-center gap-2">
                        <Chip>{getTodayFormatted()}</Chip>
                        <p>{`${category.count} tasks remaining to be completed`}</p>
                      </div>
                    ) : (
                      <p>{category.count} tasks remaining to be completed</p>
                    )}
                  </span>
                </div>
              }
              classNames={{ content: "flex flex-col gap-4 w-full" }}
            >
              <Accordion>
                {category.data.map((task, index) => (
                  <AccordionItem
                    key={task.id}
                    title={
                      <div
                        className="flex flex-row justify-between items-center"
                        key={task.id}
                      >
                        <Checkbox
                          defaultSelected={task.status === "Done"}
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
                            <Avatar
                              name={task.user}
                              size="sm"
                              key={task.id}
                              getInitials={(name) => name.charAt(0)}z
                            />
                        </div>
                        <div className="flex flex-row gap-2">
                          <Button
                            isIconOnly
                            className="bg-transparent"
                            onClick={() => onAddedSubTask(task.id )}
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
                              <DropdownItem onClick={() =>handleEditTask(task) }>Edit</DropdownItem>
                              <DropdownItem onClick={() => handleDeleteTask(task.id)} >Delete</DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                      </div>
                    }
                  >
                    {task["sub-tasks"].map((sub, index) => (
                      <div
                        className="flex flex-row justify-between items-center px-12 mb-4"
                        key={sub.description}
                      >
                        <Checkbox
                          defaultSelected={sub.status==="Done"}
                          lineThrough
                          title={sub.name}
                          onClick={() => onChangeSubStatus(sub)}
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
                            <Avatar
                              name={sub['assign-user']}
                              size="sm"
                              key={sub.id}
                              getInitials={(name) => name.charAt(0)}
                            />
                    
                        </div>
                        <Dropdown placement="bottom-end">
                          <DropdownTrigger>
                            <Button isIconOnly className="bg-transparent">
                              <BsThreeDotsVertical />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu>
                            <DropdownItem >Edit</DropdownItem>
                            <DropdownItem onClick={() => handleDeleteSubTask(sub.id)}  >Delete</DropdownItem>
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
