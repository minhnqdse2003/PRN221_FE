"use server";
import { fetchBase } from "./baseAction";

export const getTrainingPrograms = async () => {
  const url = `${process.env.API_SECRET_URL}/api/v1/trainingprograms`;

  const res = await fetchBase(url);

  return res;
};

export const getTrainingProgram = async (id) => {
  const url = `${process.env.API_SECRET_URL}/api/v1/trainingprograms/${id}`;

  const res = await fetchBase(url);

  return res;
};

export const removeTrainingProgram = async (id) => {
  const url = `${process.env.API_SECRET_URL}/api/v1/trainingprograms/${id}`;
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await fetchBase(url, options);
  return res;
};

export const updateTrainingProgram = async (id, userData) => {
  const url = `${process.env.API_SECRET_URL}/api/v1/trainingprograms/${id}`;
  const options = {
    method: "Put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  };
  const res = await fetchBase(url, options);
  return res;
};

export const createTrainingProgram = async (data) => {
  const url = `${process.env.API_SECRET_URL}/api/v1/trainingprograms`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const res = await fetchBase(url, options);
  console.log(res);
  return res;
};

export const getLessonsFromTrainingProgram = async (id) => {
  const url = `${process.env.API_SECRET_URL}/api/v1/trainingprograms/${id}/lessons`;

  const res = await fetchBase(url);

  return res;
};

export const putLesson = async (data) => {
  const url = `${process.env.API_SECRET_URL}/api/v1/lessons`;

  console.log(data);
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const res = await fetchBase(url, options);

  return res;
};
