
import { fetchBase } from "./baseAction";

export const getUserTrainings = async () => {
    const url = `${process.env.API_SECRET_URL}/api/v1/user-trainings`;
  
    const res = await fetchBase(url);
  
    return res;
  };
  
  export const getById = async (id) => {
    const url = `${process.env.API_SECRET_URL}/api/v1/user-trainings/{id}`;
  
    const res = await fetchBase(url);
  
    return res;

  };


  export const removeUserTraining = async (id) => {
    const url = `${process.env.API_SECRET_URL}/api/v1/user-trainings/${id}`;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const res = await fetchBase(url, options);
    return res;
};

export const createUserTraining = async (trainingProgramId) => {
    const url = `${process.env.API_SECRET_URL}/api/v1/user-trainings`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(),
    };
    const res = await fetchBase(url, options);
    return res;
};