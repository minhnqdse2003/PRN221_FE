import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Input,
    Select,
    SelectItem,
    Chip,
    Avatar,
    RadioGroup,
    Radio,
    DatePicker,
    Textarea,
  } from "@nextui-org/react";
  import React, { useState } from "react";
  import { useGetMembers } from "@/data/useMembers";
  import { useGetProject } from "@/data/useProjects";
  
  const CreateSubTaskModal = ({ isOpen, onOpenChange, taskId, onCreateSubTask, projectId }) => {
    const { data: projectDetails, isLoading, error } = useGetProject(projectId);
    const [description, setDescription] = useState("");
    const [assignUserID, setAssignUserID] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState(new Set());
    const [selected, setSelected] = useState("today");
    const [name, setName] = useState("");
    const [dueDate, setDueDate] = useState(new Date());
  
    const handleCreate = () => {
      const newSubTask = {
        "task-id": taskId,
        description: description,
        "due-date": dueDate,
        "assign-user-id":  Array.from(selectedUsers)[0],
        status: 'On Processing',
        name: name,
      };
      onCreateSubTask(newSubTask);
      onOpenChange(false);
    };

    const handleUserSelect = (keys) => {
      setSelectedUsers(keys);
      console.log(selectedUsers);
    };
  
    if (isLoading) return <div>Loading members...</div>;
    if (error) return <div>Error loading members: {error.message}</div>;
  
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
              <ModalHeader className="flex flex-col gap-1">Add SubTask</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="SubTask Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Textarea
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  Rows={4}
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
              </ModalBody>
              <ModalFooter>
                <Button color="foreground" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button className="bg-btn text-white" onPress={handleCreate}>
                  Add SubTask
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    );
  };
  
  export default CreateSubTaskModal;
  