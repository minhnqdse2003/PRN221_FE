"use server"
import { fetchBase } from "./baseAction";

export const getTasks = async (status = "OnGoing") => {
    const url = `${process.env.API_SECRET_URL}/api/v1/tasks?Status=${status}`;

    try {
        const tasksResponse = await fetchBase(url,{
            method: "GET",
        });

        // if (!tasksResponse || !tasksResponse.data) {
        //     throw new Error("Invalid response structure");
        // }

        // const formattedTasks = tasksResponse.data.map(task => ({
        //     id: task.id,
        //     name: task.name,
        //     description: task.description,
        //     dueDate: task['due-date'],
        //     status: task.status,
        //     priority: task.priority,
        //     users: task.users.map(user => user.name),
        //     subTasks: task['sub-tasks']
        // }));

        console.log('Formatted tasks:', tasksResponse);
        return tasksResponse;
    } catch (error) {
        console.error("Error fetching tasks: ", error);
        throw error;
    }
};
  
  export const getTask = async (id) => {
    const url = `${process.env.API_SECRET_URL}/api/v1/tasks/${id}`;
  
    const res = await fetchBase(url);
  
    return res;

  };

  export const getTasksByFilter = async ({ ProjectID, Status, Priority, PageNumber, PageSize }) => {
    const filters = {
        ProjectID: ProjectID || null,
        Status: Status || null,
        Priority: Priority || null,
        PageNumber: PageNumber || 1,
        PageSize: PageSize || 1000,
    };

    const filteredParam = Object.fromEntries(
        Object.entries(filters).filter(([, value]) => value !== null)
    );
    console.log(filteredParam);

    const queryString = new URLSearchParams(filteredParam).toString();
    const url = `${process.env.API_SECRET_URL}/api/v1/tasks?${queryString}`;

    const res = await fetchBase(url, {
        method: "GET",
    });

    return res;
};



// export const assignUserToTask = async (taskId, userId) => {
//     const url = `${process.env.API_SECRET_URL}/api/v1/tasks/${taskId}/users`; 
//     const options = {
//         method: 'POST',  
//         headers: {
//             'Content-Type': 'application/json',  
//         },
//         body: JSON.stringify({ 'user-id': userId }), 
//     };
//     const res = await fetchBase(url, options);  
//     return res;  
// };

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

