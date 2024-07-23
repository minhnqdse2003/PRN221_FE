"use client";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState, useEffect, useCallback } from "react";
import { IoIosAdd, IoIosRemoveCircleOutline } from "react-icons/io";
import TeamModalAdd from "./TeamModalAdd";
import { useGetProject, usePostProjectMemberPosition, useRemoveMemberFromProject } from "@/data/useProjects";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const columns = [
  { name: "NAME", uid: "name" },
  { name: "ROLE", uid: "position" },
  { name: "ACTIONS", uid: "actions" },
];

const TeamTab = ({ selectedProject }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: projectDetails, isLoading, error } = useGetProject(selectedProject.id);
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    if (projectDetails) {
      setUsers(projectDetails.users);
    }
  }, [projectDetails]);

  const { mutate: removeMember } = useRemoveMemberFromProject(selectedProject.id, {
    onSuccess: () => {
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== currentUserId));
      toast.success("User removed successfully");
    },
    onError: (error) => {
      toast.error(`Error removing user: ${error.message}`);
    },
  });

  const { mutate: addMember } = usePostProjectMemberPosition();

  const onClickDeleteUser = (user) => {
    setCurrentUserId(user.id);
    removeMember({ 'user-id': user.id });
  };

  const handleAddMember = (user) => {
    if (!user["user-id"] || !user.position) {
      toast.error("User ID and position are required.");
      return;
    }
    if (users.some((u) => u.id === user["user-id"])) {
      toast.error("User is already a member of the project.");
      return;
    }
    const userData = {
      "user-id": user["user-id"],
      "position": user.position,
    };
    addMember({ projectId: selectedProject.id, userData}, {
      onSuccess: () => {
        toast.success("Add successfull!");
      }
    });
  };
  const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}
          />
        );
      case "position":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Delete User">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <IoIosRemoveCircleOutline
                  color="red"
                  onClick={() => onClickDeleteUser(user)}
                />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  if (isLoading) return <div>Loading team members...</div>;
  if (error) return <div>Error loading team members: {error.message}</div>;

  return (
    <>
      <ToastContainer />
      <Card shadow="none">
        <CardBody>
          <div className="flex flex-row justify-between mb-4">
            <div className="font-semibold text-xl">Team</div>
            <Button onPress={onOpen} startContent={<IoIosAdd />}>
              Add Team
            </Button>
            <TeamModalAdd
              isOpen={isOpen}
              onOpen={onOpen}
              onOpenChange={onOpenChange}
              onAddMember={handleAddMember}
            />
          </div>
          <Table aria-label="Example table with custom cells" removeWrapper>
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody
              items={users}
              emptyContent="No team member is now available"
            >
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </>
  );
};

export default TeamTab;
