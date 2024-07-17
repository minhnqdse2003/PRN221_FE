import { fetchBase } from "./baseAction";

export const getTasks = async () => {
    const url = `${process.env.API_SECRET_URL}/api/v1/tasks`;
  
    const res = await fetchBase(url);
  
    return res;
  };
  
  export const getTask = async (id) => {
    const url = `${process.env.API_SECRET_URL}/api/v1/tasks/${id}`;
  
    const res = await fetchBase(url);
  
    return res;

  };

  export const getTasksbyFilter = async ({ ProjectID, Status, Priority, PageNumber, PageSize }) => {
    let queryParams = [];
    if (ProjectID) queryParams.push(`ProjectID=${ProjectID}`);
    if (Status) queryParams.push(`Status=${Status}`);
    if (Priority) queryParams.push(`Priority=${Priority}`);
    if (PageNumber) queryParams.push(`PageNumber=${PageNumber}`);
    if (PageSize) queryParams.push(`PageSize=${PageSize}`);

    const queryString = queryParams.length > 0 ? '?' + queryParams.join('&') : '';
    const url = `${process.env.API_SECRET_URL}/api/v1/tasks/filter${queryString}`;

    const res = await fetchBase(url);

    return res;
    
};

export const assignUserToTask = async (taskId, userId) => {
    const url = `${process.env.API_SECRET_URL}/api/v1/tasks/${taskId}/users`;  // Xây dựng URL với taskId
    const options = {
        method: 'POST',  
        headers: {
            'Content-Type': 'application/json',  
        },
        body: JSON.stringify({ 'user-id': userId }), 
    };
    const res = await fetchBase(url, options);  
    return res;  
};

export const removeUserFromTask = async (taskId, userId) => {
    const url = `${process.env.API_SECRET_URL}/api/v1/tasks/${taskId}/users`;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'user-id': userId }),
    };
    const res = await fetchBase(url, options);
    return res;
};

export const createTask = async (taskData) => {
    const url = `${process.env.API_SECRET_URL}/api/v1/tasks`;
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

export const updateTask = async (id, taskData) => {
    const url = `${process.env.API_SECRET_URL}/api/v1/tasks/${id}`;
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
    };
    const res = await fetchBase(url, options);
    return res;
};

export const deleteTask = async (id) => {
    const url = `${process.env.API_SECRET_URL}/api/v1/tasks/${id}`;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const res = await fetchBase(url, options);
    return res;
};
