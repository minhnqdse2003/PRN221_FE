import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import React from "react";
const users = [
  {
    title: "Data Scientist",
    description:
      "Analyze and interpret data to solve complex business problems.",
    duration: 14.7,
    level: "Senior Level",
  },
  {
    title: "Software Engineer",
    description: "Design, develop, and maintain software applications.",
    duration: 11.2,
    level: "Mid Level",
  },
  {
    title: "Marketing Manager",
    description:
      "Develop and execute marketing strategies to promote products and services.",
    duration: 16.3,
    level: "Senior Level",
  },
  {
    title: "Product Manager",
    description:
      "Lead the product development lifecycle from ideation to launch.",
    duration: 13.9,
    level: "Mid Level",
  },
  {
    title: "Graphic Designer",
    description:
      "Create visually appealing content for marketing, advertising, and other purposes.",
    duration: 8.5,
    level: "Entry Level",
  },
  {
    title: "Content Writer",
    description:
      "Develop and write engaging content for websites, blogs, and other marketing materials.",
    duration: 9.1,
    level: "Junior Level",
  },
  {
    title: "UX/UI Designer",
    description:
      "Design user interfaces and experiences that are both functional and user-friendly.",
    duration: 12.4,
    level: "Mid Level",
  },
  {
    title: "Sales Associate",
    description:
      "Build relationships with customers and sell products or services.",
    duration: 4.2,
    level: "Entry Level",
  },
  {
    title: "Human Resources Specialist",
    description: "Handle employee relations, recruitment, and other HR tasks.",
    duration: 11.7,
    level: "Mid Level",
  },
  {
    title: "Business Analyst",
    description:
      "Analyze business processes and identify opportunities for improvement.",
    duration: 8.9,
    level: "Junior Level",
  },
  {
    title: "Data Analyst",
    description:
      "Collect, analyze, and interpret data to inform business decisions.",
    duration: 10.8,
    level: "Mid Level",
  },
  {
    title: "QA Engineer",
    description: "Test software applications to identify and report bugs.",
    duration: 7.5,
    level: "Junior Level",
  },
  {
    title: "Project Manager",
    description:
      "Plan, execute, and monitor projects to ensure successful completion.",
    duration: 15.1,
    level: "Senior Level",
  },
  {
    title: "Software Developer",
    description: "Write and maintain code to create software applications.",
    duration: 10.3,
    level: "Mid Level",
  },
  {
    title: "Front-End Developer",
    description:
      "Develop the user interface and user experience of web applications.",
    duration: 8.2,
    level: "Junior Level",
  },
  {
    title: "Back-End Developer",
    description: "Develop the server-side logic of web applications.",
    duration: 9.6,
    level: "Mid Level",
  },
  {
    title: "Full-Stack Developer",
    description:
      "Develop both front-end and back-end components of web applications.",
    duration: 12.9,
    level: "Senior Level",
  },
  {
    title: "Network Engineer",
    description: "Design, install, and maintain computer networks.",
    duration: 11.4,
    level: "Mid Level",
  },
  {
    title: "Cybersecurity Analyst",
    description: "Protect computer systems and networks from cyber attacks.",
    duration: 8.7,
    level: "Junior Level",
  },
];

const RecentTrainingProgram = () => {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);

  return (
    <Table
      aria-label="Example table with client side pagination"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader>
        <TableColumn key="title">NAME</TableColumn>
        <TableColumn key="description">DESCRIPTION</TableColumn>
        <TableColumn key="duration">DURATION</TableColumn>
        <TableColumn key="level">DURATION</TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.title}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default RecentTrainingProgram;
