"use client";
import React from "react";
import Header from "./ui/Header";
import { FaBook } from "react-icons/fa";
import { useGetTrainingProgram } from "@/data/useTrainingPrograms";

const page = ({ params }) => {
  const { data, isLoading } = useGetTrainingProgram(params.id);

  return (
    <div>
      {!isLoading && (
        <>
          <div className="flex flex-row p-6 items-center gap-4">
            <FaBook size={24} />
            <span className="flex flex-row">
              <p className="font-semibold text-sm">Training Program / </p>
              <p className="text-sm">{data.detail.title}</p>
            </span>
          </div>
          <Header trainingProgram={data} isLoading={isLoading} />
        </>
      )}
    </div>
  );
};

export default page;
