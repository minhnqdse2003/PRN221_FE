import { fetchBase } from "./baseAction";

export const getMember = async () => {
  const url = `${process.env.API_SECRET_URL}/api/v1/members`;

  const res = await fetchBase(url);

  return res;
};

export const getMembers = async (id) => {
  const url = `${process.env.API_SECRET_URL}/api/v1/members/${id}`;

  const res = await fetchBase(url);

  return res;
};
