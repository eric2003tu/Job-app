import { Job } from '../types';
import { mockJobs } from '../data/mockJobs';

// Simulating delays to mimic a real API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// In-memory storage for jobs
let jobs = [...mockJobs];

export const jobService = {
  // Get all jobs
  async getJobs(): Promise<Job[]> {
    await delay(500); // Simulate network delay
    return [...jobs];
  },

  // Get a specific job by ID
  async getJobById(id: string): Promise<Job | undefined> {
    await delay(300);
    return jobs.find(job => job.id === id);
  },

  // Create a new job
  async createJob(job: Omit<Job, 'id'>): Promise<Job> {
    await delay(800);
    
    const newJob: Job = {
      ...job,
      id: Date.now().toString(), // Generate a unique ID
      postedDate: new Date().toISOString().split('T')[0], // Today's date
    };
    
    jobs = [newJob, ...jobs];
    return newJob;
  },

  // Search jobs based on a query
  async searchJobs(query: string): Promise<Job[]> {
    await delay(400);
    
    const searchTerms = query.toLowerCase().trim().split(/\s+/);
    
    return jobs.filter(job => {
      const searchableText = `${job.title} ${job.company} ${job.location} ${job.description} ${job.category || ''}`.toLowerCase();
      return searchTerms.some(term => searchableText.includes(term));
    });
  }
};