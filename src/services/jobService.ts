const API_BASE = "http://localhost:3000";

const getAllJobs = () => {
  return fetch(`${API_BASE}/jobs`, {
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

const postNewJob = (job: object) => {
  return fetch(`${API_BASE}/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(job),
  })
    .then(res => res.json())
    .catch(err => {
      console.error("Error posting job:", err);
      throw err;
    });
};

const applyToJob = (application: object) => {
  return fetch(`${API_BASE}/apply`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(application),
  })
    .then(res => res.json())
    .catch(err => {
      console.error("Error submitting application:", err);
      throw err;
    });
};

// Ensure applyToJob is included in the export
export const jobService = {
  getAllJobs,
  getJobById,
  postNewJob,
  applyToJob,
};