"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import React from "react";

import { useGetTasks } from "@/data/useTask";
import { useEffect, useState } from "react";


function getDaysInMonth(month, year) {
  const daysInMonth = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 1) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      return 29; // Leap year has 29 days
    } else {
      return 28;
    }
  }

  // Return the number of days in the chosen month (except February)
  return daysInMonth[month];
}

function getRandomMonthDayLy() {
  // Array of month abbreviations
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Generate random month index
  const monthIndex = Math.floor(Math.random() * 12);

  // Get the current year for leap year calculation (optional, adjust as needed)
  const currentYear = new Date().getFullYear();

  // Generate random day within the valid range for the chosen month
  const maxDays = getDaysInMonth(monthIndex, currentYear);
  const day = Math.floor(Math.random() * maxDays) + 1;

  // Format the output as "DD-MMMly"
  return `${day.toString().padStart(2, "0")}-${months[monthIndex]}`;
}

const InternTasks = () => {

  
  const { data: tasks, isLoading, error } = useGetTasks("OnGoing");

  const [taskItems, setTaskItems] = useState([]);

  useEffect(() => {
    if (tasks) {
      console.log('Tasks:', tasks);
      setTaskItems(tasks.data);
    }
  }, [tasks]);
  
  if (error) return <div>Error: {error.message}</div>;

  const users = [
    {
      title: "Data Scientist",
      description:
        "Analyze and interpret data to solve complex business problems.",
      duration: getRandomMonthDayLy(),
      level: "High",
    },
    {
      title: "Software Engineer",
      description: "Design, develop, and maintain software applications.",
      duration: getRandomMonthDayLy(),
      level: "Medium",
    },
    {
      title: "Marketing Manager",
      description:
        "Develop and execute marketing strategies to promote products and services.",
      duration: getRandomMonthDayLy(),
      level: "High",
    },
    {
      title: "Product Manager",
      description:
        "Lead the product development lifecycle from ideation to launch.",
      duration: getRandomMonthDayLy(),
      level: "Medium",
    },
    {
      title: "Graphic Designer",
      description:
        "Create visually appealing content for marketing, advertising, and other purposes.",
      duration: getRandomMonthDayLy(),
      level: "Low",
    },
  ];

  return (
    <div className="flex flex-col gap-4 bg-white p-6 rounded-xl">
      <p className="font-semibold text-2xl">OnGoing Task</p>
      <Table
        aria-label="Example table with client side pagination"
        removeWrapper
        color="warning"
        selectionMode="single"
        defaultSelectedKeys={["Product Manager"]}
      >
         <TableHeader>
          <TableColumn key="name">Task</TableColumn>
          <TableColumn key="description">Description</TableColumn>
          <TableColumn key="dueDate">Due Date</TableColumn>
          <TableColumn key="priority">Priority</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No Task Found"} items={taskItems}>
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item['due-date']}</TableCell>
              <TableCell>{item.priority}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default InternTasks;
