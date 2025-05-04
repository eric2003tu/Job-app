const API_BASE = "https://job-app-7u0y.onrender.com/api" ;

const getAllJobs = (filters = {}) => {
  const query = new URLSearchParams(filters).toString();
  return fetch(`${API_BASE}/jobs?${query}`, {
    headers: { "Content-Type": "application/json" },
  })
    .then(res => res.json())
    .catch(err => {
      console.error("Error fetching jobs:", err);
      throw err;
    });
};

const getJobById = (id: string) => {
  return fetch(`${API_BASE}/jobs/${id}`, {
    headers: { "Content-Type": "application/json" },
  })
    .then(res => res.json())
    .catch(err => {
      console.error("Error fetching job:", err);
      throw err;
    });
};

const createJob = (job: object) => {
  return fetch(`${API_BASE}/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(job),
  })
    .then(res => {
      if (!res.ok) {
        throw new Error("Failed to create job");
      }
      return res.json();
    })
    .catch(err => {
      console.error("Error creating job:", err);
      throw err;
    });
};

const updateJob = (id: string, updates: object) => {
  return fetch(`${API_BASE}/jobs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  })
    .then(res => res.json())
    .catch(err => {
      console.error("Error updating job:", err);
      throw err;
    });
};

const deleteJob = (id: string) => {
  return fetch(`${API_BASE}/jobs/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
    .then(res => res.json())
    .catch(err => {
      console.error("Error deleting job:", err);
      throw err;
    });
};

const searchJobs = (query: string) => {
  return fetch(`${API_BASE}/jobs?title=${encodeURIComponent(query)}`, {
    headers: { "Content-Type": "application/json" },
  })
    .then(res => res.json())
    .catch(err => {
      console.error("Error searching jobs:", err);
      throw err;
    });
};

export const jobService = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  searchJobs,
};