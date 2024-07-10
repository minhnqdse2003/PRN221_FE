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
} from "@nextui-org/react";
import React from "react";

const ReportModalAdd = (props) => {
  const { isOpen, onOpenChange } = props;

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
            <ModalHeader className="flex flex-col gap-1">
              Add Report
            </ModalHeader>
            <ModalBody>
              <Input autoFocus label="Content" />
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

export default ReportModalAdd;
