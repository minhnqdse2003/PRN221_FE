import { fetchBase } from "./baseAction";

export const getAllTest= async () => {
    const url = `${process.env.API_SECRET_URL}/api/v1/test-interviews`;
  
    const res = await fetchBase(url);
  
    return res;
}
export const getTestById = async (id) => {
    const url = `${process.env.API_SECRET_URL}/api/v1/test-interviews/${id}`;
  
    const res = await fetchBase(url);
  
    return res;}


    export const createTest = async (testData) => {
        const url = `${process.env.API_SECRET_URL}/api/v1/test-interviews`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData),
        };
        const res = await fetchBase(url, options);
        return res;
    };
        export const updateTest = async (id,testData) => {
        const url = `${process.env.API_SECRET_URL}/api/v1/test-interviews/${id}`;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData),
        };
        const res = await fetchBase(url, options);
        return res;
    };
    export const removeTest = async (id) => {
        const url = `${process.env.API_SECRET_URL}/api/v1/test-interviews/${id}`;
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const res = await fetchBase(url, options);
        return res;
    };