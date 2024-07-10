import React from "react";
import Header from "./ui/Header";
import TrainingProgramTable from "./ui/TrainingProgramTable";

const page = () => {
  return (
    <div>
      <Header />
      <div className="px-14 mt-8">
        <TrainingProgramTable />
      </div>
    </div>
  );
};

export default page;
