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
    DatePicker,
  } from "@nextui-org/react";
  import React, { useState } from "react";
  import { useGetMembers } from "@/data/useMembers";
  
  const CreateSubTaskModal = ({ isOpen, onOpenChange, taskId, onCreateSubTask }) => {
    const { data: members, isLoading, error } = useGetMembers();
    const [description, setDescription] = useState("");
    const [assignUserID, setAssignUserID] = useState(null);
    const [status, setStatus] = useState("");
    const [name, setName] = useState("");
    const [dueDate, setDueDate] = useState(new Date());
  
    const handleCreate = () => {
      const newSubTask = {
        TaskId: taskId,
        Description: description,
        DueDate: dueDate,
        AssignUserID: assignUserID,
        Status: status,
        Name: name,
      };
      onCreateSubTask(newSubTask);
      onOpenChange(false);
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
                <Input
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Select
                  items={members.data}
                  label="Assign User"
                  variant="bordered"
                  placeholder="Select a user"
                  labelPlacement="outside"
                  onSelectionChange={(key) => setAssignUserID(key)}
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
                <Input
                  label="Status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                />
                <DatePicker
                  label="Due Date"
                  value={dueDate}
                  onChange={setDueDate}
                />
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
  