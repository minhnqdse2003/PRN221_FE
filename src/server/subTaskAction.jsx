"use server"

import { fetchBase } from "./baseAction";

export const createSubTask = async (taskData) => {
    const url = `${process.env.API_SECRET_URL}/api/v1/subtasks`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
    };
    const res = await fetchBase(url, options);
    return res;
};

export const updateSubTask = async (taskData) => {
    const url = `${process.env.API_SECRET_URL}/api/v1/subtasks`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
    };
    const res = await fetchBase(url, options);
    return res;
};

export const deleteSubTask = async (id) => {
    const url = `${process.env.API_SECRET_URL}/api/v1/subtasks/${id}`;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const res = await fetchBase(url, options);
    return res;
};



