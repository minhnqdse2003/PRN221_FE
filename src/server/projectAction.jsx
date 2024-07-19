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


export const createProject = async (projectData) => {
    const url = `${process.env.API_SECRET_URL}/api/v1/projects`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
    };
    const res = await fetchBase(url, options);
    return res;
};


export const removeProject = async (ProjectId) => {
  const url = `${process.env.API_SECRET_URL}/api/v1/projects/${ProjectId}`;
  const options = {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
      },
  };
  const res = await fetchBase(url, options);
  return res;
};

export const updateProject = async (id, projectData) => {
  const url = `${process.env.API_SECRET_URL}/api/v1/projects/${id}`;
  const options = {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
  };
  const res = await fetchBase(url, options);
  return res;
};

export const getProjectMemberFromProject = async (ProjectId) => {
  const url = `${process.env.API_SECRET_URL}/api/v1/project/${ProjectId}/users`;

  const res = await fetchBase(url);

  return res;
};


export const postProjectMemberPosition = async (projectId, userData) => {
    const url = `${process.env.API_SECRET_URL}/api/v1/projects/${projectId}/users`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    };
    const res = await fetchBase(url, options);
    return res;
};
export const putProjectMemberPosition = async (projectId, userData) => {
  const url = `${process.env.API_SECRET_URL}/api/v1/projects/${projectId}/users`;
  const options = {
      method: 'Put',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
  };
  const res = await fetchBase(url, options);
  return res;
};


export const removeMemberFromProject = async (projectId, userId)=>{
  const url = `${process.env.API_SECRET_URL}/api/v1/projects/${projectId}/users`;
  const options = {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 'user-id': userId }),
  };
const res = await fetchBase(url, options);
return res;
}




