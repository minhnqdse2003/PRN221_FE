import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Input,
  Avatar,
  RadioGroup,
  Radio,
  DatePicker,
  Select,
  SelectItem,
  Chip,
  Textarea,
} from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetProject } from "@/data/useProjects";
import { useCreateTask } from "@/data/useTask";
import { useAssignUsersToTask } from "@/data/useTask";
import { endOfDay, addDays, formatISO } from "date-fns";

const TaskModalAdd = (props) => {
  const { isOpen, onOpenChange, projectId } = props;
  const { data: projectDetails, isLoading, error } = useGetProject(projectId);
  const { mutate: createTask } = useCreateTask(onOpenChange);
  const { mutate: assignUsersToTask } = useAssignUsersToTask(null, onOpenChange);
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [selected, setSelected] = useState("today");
  const [description, setDescription] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [customDate, setCustomDate] = useState(null);
  const [priority, setPriority] = useState("High");

  useEffect(() => {
    if (error) {
      toast.error("Failed to load project details");
    }
  }, [error]);

  const handleAddTask = () => {
    if (!taskTitle) {
      toast.error("Task title is required");
      return;
    }

    const dueDate = selected === "customize"
      ? customDate
      : selected === "today"
        ? endOfDay(new Date())
        : selected === "tomorrow"
          ? endOfDay(addDays(new Date(), 1))
          : endOfDay(addDays(new Date(), 7));

    const taskData = {
      "project-id": projectId,
      name: taskTitle,
      description: description , 
      "due-date": formatISO(dueDate),
      status: "On Processing",
      priority: priority,
    };

    createTask(taskData, {
      onSuccess: (data) => {
        console.log(selectedUsers);
        // const taskId = data.id;
      //   assignUsersToTask({ taskId, userIds: Array.from(selectedUsers),
      //     onSuccess: () => {
      //       toast.success("Task added and users assigned successfully");
      //     },
      //     onError: (error) => {
      //       toast.error("Failed to assign users to task");
      //     },
      //    },                    
      // );
        toast.success("Task added successfully");
        onOpenChange(false);
      },
      onError: (error) => {
        toast.error("Failed to add task");
      },
    });
  };

  const handleUserSelect = (keys) => {
    setSelectedUsers(keys);
  };

  return (
    <>
      <ToastContainer />
      <Modal backdrop="opaque" isOpen={isOpen} onOpenChange={onOpenChange} radius="lg">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add Task</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Task Title"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                />
                <Textarea
                  autoFocus
                  label= "Description "
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
                {/* <Select
                  items={projectDetails?.users || []}
                  label="Assigned to"
                  variant="bordered"
                  selectionMode="single"
                  placeholder="Select a user"
                  labelPlacement="outside"
                  classNames={{
                    base: "max-w-xs",
                    trigger: "min-h-12 py-2",
                  }}
                  selectedKeys={selectedUsers}
                  onSelectionChange={handleUserSelect}
                  renderValue={(items) => (
                    <div className="flex flex-wrap gap-2">
                      {Array.from(items).map((item) => (
                        <Chip key={item} className="flex items-center">
                          {projectDetails?.users.find((user) => user.id === item)?.name}
                        </Chip>
                      ))}
                    </div>
                  )}
                >
                  {(user) => (
                    <SelectItem key={user.id} textValue={user.name}>
                      <div className="flex gap-2 items-center">
                        <Avatar
                          alt={user.name}
                          className="flex-shrink-0"
                          size="sm"
                          src={user.avatar}
                        />
                        <div className="flex flex-col">
                          <span className="text-small">{user.name}</span>
                          <span className="text-tiny text-default-400">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </SelectItem>
                  )}
                </Select> */}
                <RadioGroup
                  value={selected}
                  onValueChange={setSelected}
                  label="Due Date"
                  orientation="horizontal"
                >
                  <Radio value="today">Today</Radio>
                  <Radio value="upcoming">Upcoming</Radio>
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
                    label="Due Date"
                    className="max-w-[284px]"
                    onChange={(date) => setCustomDate(endOfDay(date))}
                  />
                )}
                <RadioGroup
                  value={priority}
                  onValueChange={setPriority}
                  label="Priority"
                  orientation="horizontal"
                >
                  <Radio value="Low">Low</Radio>
                  <Radio value="High">High</Radio>
                </RadioGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="foreground" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button className="bg-btn text-white" onPress={handleAddTask}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default TaskModalAdd;
