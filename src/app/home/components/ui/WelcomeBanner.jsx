"use client";
import React from "react";
import InternTasks from "./InternTasks";
import CardSectionIntern from "./CardSectionIntern";
import { Progress } from "@nextui-org/react";
import { FaBarsProgress } from "react-icons/fa6";
import FeedbackTasks from "./FeedbackTasks";

const WelcomeBanner = () => {
  const items = [
    { name: "Project 1", value: "50", completed: "50", total: "100" },
    { name: "Project 1", value: "50", completed: "50", total: "100" },
    { name: "Project 1", value: "50", completed: "50", total: "100" },
    { name: "Project 1", value: "50", completed: "50", total: "100" },
    { name: "Project 1", value: "50", completed: "50", total: "100" },
    { name: "Project 1", value: "50", completed: "50", total: "100" },
  ];
  return (
    <div className="flex gap-4 flex-row">
      <div className="w-3/4 flex flex-col gap-4">
        <CardSectionIntern />
        <InternTasks />
        <FeedbackTasks />
      </div>
      <div className="h-full w-1/4 bg-white rounded-xl p-4 font-semibold">
        <p className="text-2xl font-semibold mb-4">Projects</p>
        <div className="flex flex-col gap-4">
          {items.map((item, index) => (
            <div
              className="flex flex-col gap-4 p-4 rounded-md bg-slate-50"
              key={item.name}
            >
              <p className="text-xl font-medium">{item.name}</p>
              <div className="flex flex-row justify-between">
                <div className="flex flex-row justify-start gap-2">
                  <FaBarsProgress />
                  <p className="text-sm text-black/40">Progress</p>
                </div>
                <p className="text-sm text-black/40">{`${item.completed}/${item.total}`}</p>
              </div>

              <Progress
                size="sm"
                classNames={{ indicator: "bg-blue-600" }}
                value={item.value}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
