"use server";
import { fetchBase } from "./baseAction";

export const getLessons = async () => {
  const url = `${process.env.API_SECRET_URL}/api/v1/lessons`;

  const res = await fetchBase(url);

  return res;
};

export const getLesson = async (lessonId) => {
  const url = `${process.env.API_SECRET_URL}/api/v1/lessons/${lessonId}`;

  const res = await fetchBase(url);

  return res;
};

export const updateLesson = async (lessonId, userData) => {
  const url = `${process.env.API_SECRET_URL}/api/v1/lessons/${lessonId}`;
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

export const addLesson = async (data) => {
  const url = `${process.env.API_SECRET_URL}/api/v1/lessons`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const res = await fetchBase(url, options);
  return res;
};

export const removeLesson = async (lessonId) => {
  const url = `${process.env.API_SECRET_URL}/api/v1/lessons/${lessonId}`;
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await fetchBase(url, options);
  return res;
};
