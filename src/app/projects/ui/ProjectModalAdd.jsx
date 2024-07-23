import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Input,
    DatePicker,
  } from "@nextui-org/react";
  import React, { useState } from "react";
  import { toast } from "react-toastify";
  import { useCreateProject  } from "@/data/useProjects";  
  const ProjectModalAdd = ({ isOpen, onOpenChange }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [leaderId, setLeaderId] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
  
    const { mutate: addProject } = useCreateProject(onOpenChange);
  
    const handleAdd = () => {
      if (!name || !description || !leaderId || !startDate || !endDate) {
        toast.error("All fields are required");
        return;
      }

    //   const formattedStartDate = startDate ? startDate.toISOString() : null;
    //   const formattedEndDate = endDate ? endDate.toISOString() : null;

    //   const formattedStartDate =startDate.toISOString();
    //   const formattedEndDate = endDate.toISOString() ;

      addProject({
        name,
        description,
        "leader-id": leaderId,
        "start-date": formattedStartDate,
        "end-date":  formattedEndDate,
      }, {
        onSuccess: () => {
          toast.success("Project added successfully");
        },
        onError: (error) => {
          toast.error(`Error adding project: ${error.message}`);
        },
      });
    };
  
    return (
      <Modal backdrop="opaque" isOpen={isOpen} onOpenChange={onOpenChange} radius="lg">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add Project</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Input
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <Input
                  label="Leader ID"
                  value={leaderId}
                  onChange={(e) => setLeaderId(e.target.value)}
                  required
                />
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={setStartDate}
                  placeholder="Select start date"
                  required
                />
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={setEndDate}
                  placeholder="Select end date"
                  required
                />
              </ModalBody>
              <ModalFooter>
                <Button color="foreground" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button className="bg-btn text-white" onPress={handleAdd}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    );
  };
  
  export default ProjectModalAdd;
  