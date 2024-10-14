import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Input,
  Textarea
} from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import{useCreateWorkReport} from "@/data/useReport"
const ReportModalAdd = (props) => {
  const { isOpen, onOpenChange, projectId } = props;
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const { mutate: createWorkReport } = useCreateWorkReport(() => {
    onOpenChange(false);
    setName("");
    setContent("");
    setError("");
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleAddReport = () => {
    if (!name || !content) {
      setError("Both fields are required.");
      return;
    }

    const reportData = {
      "project-id": projectId,
      name,
      "content-report": content,
    };

    createWorkReport(reportData, {
      onSuccess: () => {
        toast.success("Report added successfully");
        onOpenChange(false);
      },
      onError: (error) => {
        toast.error("Failed to add report");
      },
    });
  };

  return (
    <>
      <ToastContainer />
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="lg"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add Report</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Textarea
                  label="Content"
                  rows={5}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
              </ModalBody>
              <ModalFooter>
                <Button color="foreground" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button className="bg-btn text-white" onPress={handleAddReport}>
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

export default ReportModalAdd;
