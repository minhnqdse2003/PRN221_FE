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
  Avatar,
  useDisclosure,
} from "@nextui-org/react";
import {
  IoMdAdd as PlusIcon,
  IoMdArrowDropdown as ChevronDownIcon,
} from "react-icons/io";
import { IoSearchOutline as SearchIcon } from "react-icons/io5";
import { capitalize } from "@/utils/displayUtils";
import { FaChevronRight } from "react-icons/fa";
import { permanentRedirect, redirect, useRouter } from "next/navigation";
import { useGetTrainingPrograms } from "@/data/useTrainingPrograms";
import AddTrainingProgram from "./AddTrainingProgram";
import { useSession } from "next-auth/react";
const statusColorMap = {
  Easy: "success",
  Medium: "warning",
  Hard: "danger",
};

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "TITLE", uid: "title", sortable: true },
  { name: "DESCRIPTION", uid: "description" },
  { name: "DURATION", uid: "duration", sortable: true },
  { name: "LEVEL", uid: "level", sortable: true },
  { name: "USER", uid: "user" },
  { name: "", uid: "action" },
];

const statusOptions = [
  { name: "Easy", uid: "Easy" },
  { name: "Medium", uid: "Medium" },
  { name: "Hard", uid: "Hard" },
];

const TrainingProgramTable = () => {
  const { data } = useGetTrainingPrograms();
  const session = useSession();

  const trainingPrograms = data?.data || [];
  const isManager = session.data.user.role === "Training Manager";

  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "age",
    direction: "ascending",
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    let filteredTrainingPrograms = [...trainingPrograms];

    if (hasSearchFilter) {
      filteredTrainingPrograms = filteredTrainingPrograms.filter((user) =>
        user.title.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredTrainingPrograms = filteredTrainingPrograms.filter((user) =>
        Array.from(statusFilter).includes(user.level)
      );
    }

    return filteredTrainingPrograms;
  }, [trainingPrograms, filterValue, statusFilter]);

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

  const renderCell = useCallback((program, columnKey) => {
    const cellValue = program[columnKey];

    switch (columnKey) {
      case "level":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[program.level]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "user":
        return (
          <div className="flex -space-x-3 rtl:space-x-reverse">
            {program.users?.length > 0
              ? program.users.map((item) => (
                  <Avatar
                    name={item.name}
                    size="sm"
                    key={item.name}
                    getInitials={(name) => name.charAt(0)}
                  />
                ))
              : "No User Join"}
          </div>
        );
      case "action":
        return (
          <Button
            isIconOnly
            size="sm"
            variant="light"
            onClick={() => onDetailsTrainingProgram(program)}
          >
            <FaChevronRight className="text-default-300" />
          </Button>
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

  const onDetailsTrainingProgram = (program) => {
    router.push(`/trainingprograms/${program.id}`);
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
                  Level
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="single"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            {isManager && (
              <Button
                onPress={onOpen}
                color="primary"
                endContent={<PlusIcon />}
              >
                Add New
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    trainingPrograms.length,
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
          wrapper: "max-h-[382px]",
        }}
        selectedKeys={selectedKeys}
        selectionMode="single"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
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
      <AddTrainingProgram isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
};

export default TrainingProgramTable;
