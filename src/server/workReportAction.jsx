"use server";

import { fetchBase } from "./baseAction";
export const createWorkReport = async (workReportData) => {
    const url = `${process.env.API_SECRET_URL}/api/v1/work-reports`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workReportData),
    };
    const res = await fetchBase(url, options);
    return res;
  };