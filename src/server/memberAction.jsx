"use server";
import { fetchBase } from "./baseAction";

export const getMember = async () => {
  const url = `${process.env.API_SECRET_URL}/api/v1/users`;

  const res = await fetchBase(url);

  return res;
};

export const getMembers = async (id) => {
  const url = `${process.env.API_SECRET_URL}/api/v1/users/${id}`;

  const res = await fetchBase(url);

  return res;
};

export const addMember = async (data) => {
  const url = `${process.env.API_SECRET_URL}/api/v1/users`;

  const res = await fetchBase(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
};

export const putMember = async (data) => {
  const url = `${process.env.API_SECRET_URL}/api/v1/users`;

  const res = await fetchBase(url, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
};
