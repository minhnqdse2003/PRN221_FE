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
