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
import { useUpdateTask, useAssignUsersToTask } from "@/data/useTask";
import { endOfDay, addDays, formatISO, isSameDay } from "date-fns";

const TaskModalEdit = (props) => {
  const { isOpen, onOpenChange, projectId, task } = props;
  const { data: projectDetails, isLoading, error } = useGetProject(projectId);
  const { mutate: updateTask } = useUpdateTask(onOpenChange);
  const { mutate: assignUsersToTask } = useAssignUsersToTask(null, onOpenChange);
  const [selectedUsers, setSelectedUsers] = useState("");
  const [selected, setSelected] = useState("today");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [customDate, setCustomDate] = useState(null);
  const [priority, setPriority] = useState("High");

  useEffect(() => {
    if (task) {
      setTaskTitle(task.name);
      setPriority(task.priority);
      setSelectedUsers(task.users?.[0]?.id || "");     }
  }, [task]);

  useEffect(() => {
    if (error) {
      toast.error("Failed to load project details");
    }
  }, [error]);

  const handleUpdateTask = () => {
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
      id: task.id,
      name: taskTitle ?? task.title,
      description: taskDescription ?? task.description, 
      status: task.status,
      priority: priority ?? task.priority,
    };
    const assignTask = {

    }

    updateTask(taskData, { 
      onSuccess: () => {
        assignUsersToTask({ taskId: task.id, userId: selectedUsers } , {
          onSuccess: () =>{
            toast.success("Assign user to tast successfully")
          }
        })
        toast.success("Task updated successfully");
      },
      onError: (error) => {
        toast.error("Failed to update task");
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
              <ModalHeader className="flex flex-col gap-1">Edit Task</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label= "Title "
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                />
                <Textarea
                  autoFocus
                  label= "Description "
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  rows={4}
                />
                <Select
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
                </Select>
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
                <Button className="bg-btn text-white" onPress={handleUpdateTask}>
                  Update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default TaskModalEdit;
