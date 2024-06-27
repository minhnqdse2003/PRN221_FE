"use client";
import React from "react";
import VolumePosition from "../ui/VolumePosition";
import CardSectionVolume from "../ui/CardSectionVolume";
import CardSectionRate from "../ui/CardSectionRate";
import RecentTrainingProgram from "../ui/RecentTrainingProgram";
import RecentIntern from "../ui/RecentIntern";

const HrPage = () => {
  return (
    <main className="w-full flex flex-row gap-8">
      <section className="w-full flex flex-col gap-4">
        <p className="text-2xl font-semibold">Top Application Volumes</p>
        <CardSectionVolume />
        <p className="text-2xl font-semibold">
          Acceptance Rate & Completion Rate
        </p>
        <CardSectionRate />
        <p className="text-2xl font-semibold">Position Application</p>
        <VolumePosition />
        <div className="flex flex-row gap-12 w-full">
          <div className="flex flex-col w-full">
            <p className="text-2xl font-semibold">Recent Training Program</p>
            <RecentTrainingProgram />
          </div>
          <div className="flex flex-col w-full">
            <p className="text-2xl font-semibold">Recent Interns</p>
            <RecentIntern />
          </div>
        </div>
      </section>
    </main>
  );
};

export default HrPage;
