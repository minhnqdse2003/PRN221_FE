import {
  Button,
  Card,
  CardBody,
  useDisclosure,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
} from "@nextui-org/react";
import React from "react";
import { IoIosAdd, IoIosRemoveCircleOutline } from "react-icons/io";
import TeamModalAdd from "./TeamModalAdd";

const columns = [
  { name: "NAME", uid: "name" },
  { name: "ROLE", uid: "position" },
  { name: "ACTIONS", uid: "actions" },
];

const users = [
  {
    id: 1,
    name: "Tony Reichert",
    position: "CEO",
    email: "tony.reichert@example.com",
  },
  {
    id: 2,
    name: "Zoey Lang",
    position: "Technical Lead",
    email: "zoey.lang@example.com",
  },
  {
    id: 3,
    name: "Jane Fisher",
    position: "Senior Developer",
    email: "jane.fisher@example.com",
  },
  {
    id: 4,
    name: "William Howard",
    position: "Community Manager",
    email: "william.howard@example.com",
  },
  {
    id: 5,
    name: "Kristen Copper",
    position: "Sales Manager",
    email: "kristen.cooper@example.com",
  },
];

const TeamTab = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const onClickDeleteUser = (user) => {
    console.log(user);
  };

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
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

  return (
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
  );
};

export default TeamTab;
