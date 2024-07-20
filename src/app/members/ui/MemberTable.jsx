"use client";
import React, { useCallback, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  User,
  Link,
  useDisclosure,
} from "@nextui-org/react";
import {
  IoMdAdd as PlusIcon,
  IoMdArrowDropdown as ChevronDownIcon,
} from "react-icons/io";
import { IoSearchOutline as SearchIcon } from "react-icons/io5";
import { capitalize, getTodayFormatted } from "@/utils/displayUtils";
import { FaChevronRight, FaFemale, FaMale } from "react-icons/fa";
import AddMemberModal from "./AddMemberModal";
import ViewMemberModal from "./ViewMemberModal";

const statusColorMap = {
  approved: "success",
  pending: "warning",
};

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "DOB", uid: "dob", sortable: true },
  { name: "PHONE", uid: "phone" },
  { name: "ADDRESS", uid: "address" },
  { name: "GPA", uid: "gpa", sortable: true },
  { name: "MAJOR", uid: "major" },
  { name: "POSITION", uid: "desired-position" },
  { name: "GENDER", uid: "gender", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "CV", uid: "link" },
];

const statusOptions = [
  { name: "Approved", uid: "approved" },
  { name: "Pending", uid: "pending" },
];

const genderOptions = [
  { name: "Male", uid: "male" },
  { name: "Female", uid: "female" },
];

const users = [
  {
    id: 1,
    name: "Nguyen Tran Trung Anh",
    dob: getTodayFormatted(),
    gender: "male",
    email: "minhnqdse172303@fpt.edu.vn",
    phone: "0916544231",
    address: "445/1/85 Tan Thoi Nhat,Q.1,TP.HCM",
    gpa: 3.5,
    link: "https://www.facebook.com/",
    major: "Software Engineer",
    status: "pending",
    "desired-position": "Internship",
  },
  {
    id: 2,
    name: "Le Thi Thu Ha",
    dob: new Date("1998-05-20").toLocaleDateString(), // Example formatted date
    gender: "female",
    email: "lethithuha@gmail.com",
    phone: "0987654321",
    address: "123 Nguyen Van Cu, Q.3, TP.HCM",
    gpa: 3.8,
    link: "https://www.linkedin.com/in/lethithuha/",
    major: "Computer Science",
    status: "approved",
    "desired-position": "Full-Time",
  },
  {
    id: 3,
    name: "Tran Minh Duc",
    dob: new Date("2000-10-12").toLocaleDateString(),
    gender: "male",
    email: "tranminhduc@example.com",
    phone: "0123456789",
    address: "567/8, Truong Chinh, Q.12, TP.HCM",
    gpa: 3.2,
    link: "", // Optional link
    major: "Data Science",
    status: "pending",
    "desired-position": "Part-Time",
  },
  {
    id: 8,
    name: "Hoang Thi Mai",
    dob: new Date("1999-02-14").toLocaleDateString(),
    gender: "female",
    email: "hoangthimai@yahoo.com",
    phone: "0943215678",
    address: "890 Tran Hung Dao, Q.5, TP.HCM",
    gpa: 3.7,
    link: "https://github.com/hoangthimai",
    major: "Web Development",
    status: "approved",
    "desired-position": "Freelance",
    role: "heheheh",
  },
  {
    id: 9,
    name: "Phan Van Nam",
    dob: new Date("2001-08-07").toLocaleDateString(),
    gender: "male",
    email: "phanvannam@hotmail.com",
    phone: "0168901234",
    address: "321 Le Van Sy, Q.Thu Duc, TP.HCM",
    gpa: 3.0,
    link: "", // Optional link
    major: "Information Technology",
    status: "pending",
    "desired-position": "Full-Time",
  },
  {
    id: 11,
    name: "Dao Thi My Linh",
    dob: new Date("1997-11-23").toLocaleDateString(),
    gender: "female",
    email: "daothimylinh@gmail.com",
    phone: "0976543210",
    address: "678 Nguyen Trai, Q.10, TP.HCM",
    gpa: 3.9,
    link: "https://www.linkedin.com/in/daothimylinh/",
    major: "Computer Science",
    status: "approved",
    "desired-position": "Full-Time",
  },
  {
    id: 21,
    name: "Cao Xuan Nam",
    dob: new Date("2002-03-05").toLocaleDateString(),
    gender: "male",
    email: "caoxuannam@outlook.com",
    phone: "0123456789",
    address: "987 Le Loi, Q.3, TP.HCM",
    gpa: 3.3,
    link: "https://github.com/caoxuannam",
    major: "Information Technology",
    status: "pending",
    "desired-position": "Part-Time",
  },
];

const MemberTable = () => {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [statusFilter, setStatusFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "id",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);
  const [selectedMember, setSelectedMember] = useState(null);
  const {
    isOpen: isViewModalOpen,
    onOpen: onViewModalOpen,
    onOpenChange: onViewModalOpenChange,
  } = useDisclosure();

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status)
      );
    }

    if (
      genderFilter !== "all" &&
      Array.from(genderFilter).length !== genderOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(genderFilter).includes(user.gender)
      );
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter, genderFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "gender":
        return (
          <div>
            {cellValue === "female" ? (
              <Chip className="capitalize" size="sm" variant="flat">
                <FaFemale />
              </Chip>
            ) : (
              <Chip className="capitalize" size="sm" variant="flat">
                <FaMale />
              </Chip>
            )}
          </div>
        );
      case "name":
        return (
          <div className="flex -space-x-3 rtl:space-x-reverse">
            <User
              avatarProps={{ radius: "lg", name: cellValue.charAt(0) }}
              description={user.email}
              name={cellValue}
            >
              {user.email}
            </User>
          </div>
        );
      case "action":
        return (
          <Button
            isIconOnly
            size="sm"
            variant="light"
            onClick={() => onDetailsTrainingProgram(user)}
          >
            <FaChevronRight className="text-default-300" />
          </Button>
        );
      case "link":
        return (
          <Link href={cellValue} showAnchorIcon size="sm" isExternal>
            Link
          </Link>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const onDetailsTrainingProgram = (user) => {
    setSelectedMember(user);
    onViewModalOpen();
  };

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Gender
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Status"
                closeOnSelect={false}
                selectedKeys={genderFilter}
                selectionMode="multiple"
                onSelectionChange={setGenderFilter}
              >
                {genderOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Gender"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button onPress={onOpen} color="primary" endContent={<PlusIcon />}>
              Add New
            </Button>
          </div>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    genderFilter,
    users.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <div>
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[400px] w-full",
        }}
        selectedKeys={selectedKeys}
        selectionMode="single"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
        className="w-full"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"No Training Program Found"}
          items={sortedItems}
        >
          {(item) => (
            <TableRow
              key={item.id}
              onClick={() => onDetailsTrainingProgram(item)}
            >
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <AddMemberModal isOpen={isOpen} onOpenChange={onOpenChange} />
      <ViewMemberModal
        isOpen={isViewModalOpen}
        onOpenChange={onViewModalOpenChange}
        selectedMember={selectedMember}
      />
    </div>
  );
};

export default MemberTable;
