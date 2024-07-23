import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";

const ViewMemberModal = ({ isOpen, onOpenChange, selectedMember }) => {
  return (
    <Modal
      placement="top"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      scrollBehavior="inside"
      className="h-[calc(100vh-8.5rem)]"
      classNames={{
        wrapper: "justify-end",
      }}
    >
      <ModalContent>
        <ModalHeader>Member Details</ModalHeader>
        <ModalBody>
          {selectedMember && (
            <>
              <label htmlFor="id">ID:</label>
              <Input id="id" value={selectedMember.id} disabled={true} />
              <label htmlFor="name">Name:</label>
              <Input id="name" value={selectedMember.name} disabled={true} />
              <label htmlFor="dob">Date of Birth:</label>
              <Input id="dob" value={selectedMember.dob} disabled={true} />
              <label htmlFor="gender">Gender:</label>
              <Input id="gender" value={selectedMember.gender} disabled={true} />
              <label htmlFor="email">Email:</label>
              <Input id="email" value={selectedMember.email} disabled={true} />
              <label htmlFor="phone">Phone:</label>
              <Input id="phone" value={selectedMember.phone} disabled={true} />
              <label htmlFor="address">Address:</label>
              <Input id="address" value={selectedMember.address} disabled={true} />
              <label htmlFor="gpa">GPA:</label>
              <Input id="gpa" value={selectedMember.gpa} disabled={true} />
              <label htmlFor="link">GitHub Link:</label>
              <Input id="link" value={selectedMember.link} disabled={true} />
              <label htmlFor="major">Major:</label>
              <Input id="major" value={selectedMember.major} disabled={true} />
              <label htmlFor="status">Status:</label>
              <Input id="status" value={selectedMember.status} disabled={true} />
              <label htmlFor="desired-position">Desired Position:</label>
              <Input
                id="desired-position"
                value={selectedMember["desired-position"]}
                disabled={true}
              />
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" auto onPress={() => onOpenChange(false)}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ViewMemberModal;
