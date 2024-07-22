import { useGetMembers } from "@/data/useMembers";
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
import React, { useState } from "react";

const TeamModalAdd = (props) => {
  const { isOpen, onOpenChange, onAddMember } = props;
  const { data: members, isLoading, error } = useGetMembers();
  const [selectedUser, setSelectedUser] = useState(null);
  const [position, setPosition] = useState("");

  const handleAdd = () => {
    console.log("User: ", selectedUser);
    if (selectedUser) {
      onAddMember({ "user-id": selectedUser.id, position });
      onOpenChange(false);
    }
  };

  return (
    <Modal backdrop="opaque" isOpen={isOpen} onOpenChange={onOpenChange} radius="lg">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add Person</ModalHeader>
            <ModalBody>
              <Input autoFocus label="Position" value={position} onChange={(e) => setPosition(e.target.value)} />
              <Autocomplete
                defaultItems={members.data}
                variant="bordered"
                label="Assigned to"
                placeholder="Select a user"
                labelPlacement="inside"
                className="w-full font-semibold"
                classNames={{ listboxWrapper: "bg-white" }}
                onSelect={(item) => setSelectedUser(item)}
                onSelectionChange={(key) => {
                  const user = members.data.find((member) => member.id === key);
                  setSelectedUser(user);
                  console.log("Selected User: ", user);
                }}
              >
                {(user) => (
                  <AutocompleteItem key={user.id} textValue={user.name}>
                    <div className="flex gap-2 items-center">
                      <Avatar name={user.name} size="sm" key={user.name} getInitials={(name) => name.charAt(0)} />
                      <div className="flex flex-col">
                        <span className="text-small">{user.name}</span>
                        <span className="text-tiny text-default-400">{user.email}</span>
                      </div>
                    </div>
                  </AutocompleteItem>
                )}
              </Autocomplete>
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

export default TeamModalAdd;
