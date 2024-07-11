import { fetchBase } from "./baseAction";

export const getProjects = async () => {
  const url = `${process.env.API_SECRET_URL}/api/v1/projects`;

  const res = await fetchBase(url);

  return res;
};

export const getProject = async (id) => {
  const url = `${process.env.API_SECRET_URL}/api/v1/projects/${id}`;

  const res = await fetchBase(url);

  return res;
};

export const getProjectMember = async (id) => {
  const url = `${process.env.API_SECRET_URL}/api/v1/members/${id}`;

  const res = await fetchBase(url);

  return res;
};
