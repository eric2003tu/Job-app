//list jobs available

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { jobService } from '../services/jobService';
import { Job } from '../types';
import JobCard from '../components/JobCard';
import SearchBar from '../components/SearchBar';
import JobFilters from '../components/JobFilters';
import { Loader } from 'lucide-react';
import { FaArrowLeft, FaPaperPlane } from "react-icons/fa";
import DOMPurify from 'dompurify';

const JobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isApplying, setIsApplying] = useState(false);

  const fetchJobs = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await jobService.getAllJobs();
      
      if (!Array.isArray(response)) {
        throw new Error('Expected array of jobs but got: ' + JSON.stringify(response));
      }

      const isValidJobs = response.every(job => 
        job.id && job.title && job.company && job.location
      );

      if (!isValidJobs) {
        throw new Error('Invalid job data structure received');
      }

      setJobs(response);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError(err instanceof Error ? err.message : 'Failed to load jobs. Please try again.');
      setJobs([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = searchQuery 
        ? `${job.title} ${job.company} ${job.location} ${job.category || ''}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        : true;

      const matchesFilters = Object.entries(filters).every(([key, value]) => 
        !value || String(job[key as keyof Job] || '').toLowerCase() === value.toLowerCase()
      );

      return matchesSearch && matchesFilters;
    });
  }, [jobs, searchQuery, filters]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);
 
  const handleFilterChange = useCallback((newFilters: Record<string, string>) => {
    setFilters(newFilters);
  }, []);

  const resetFiltersAndSearch = useCallback(() => {
    setSearchQuery('');
    setFilters({});
  }, []);

  const handleApplyClick = useCallback((job: Job) => {
    setSelectedJob(job);
    setIsApplying(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBackToList = useCallback(() => {
    setSelectedJob(null);
    setIsApplying(false);
  }, []);

  const handleSubmitApplication = useCallback(async () => {
    if (!selectedJob) return;
    
    try {
      // Here you would call your API to submit the application
      // await jobService.submitApplication(selectedJob.id);
      alert(`Application submitted for ${selectedJob.title} at ${selectedJob.company}!`);
      handleBackToList();
    } catch (err) {
      console.error('Failed to submit application:', err);
      alert('Failed to submit application. Please try again.');
    }
  }, [selectedJob, handleBackToList]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section - Always Visible */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white mb-4">Find Your Dream Job</h1>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Browse thousands of job opportunities and take the next step in your career journey.
            </p>
          </div>
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar - Always Visible */}
          <div className="lg:col-span-1">
            <JobFilters 
              onFilterChange={handleFilterChange} 
              filters={filters} 
              availableCategories={[...new Set(jobs.map(job => job.category))]}
            />
          </div>

          {/* Jobs List/Application View */}
          <div className="lg:col-span-3">
            {isApplying && selectedJob ? (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                {/* Application Header */}
                <div className="flex justify-between items-center mb-6">
                  <button 
                    onClick={handleBackToList}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <FaArrowLeft className="mr-2" />
                    Back to listings
                  </button>
                  <button
                    onClick={handleSubmitApplication}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    <FaPaperPlane className="mr-2" />
                    Submit Application
                  </button>
                </div>

                {/* Job Details */}
                <div className="mb-4">
                  <h2 className="text-2xl font-bold mb-2">{selectedJob.title}</h2>
                  <h3 className="text-xl text-gray-700 mb-4">{selectedJob.company} • {selectedJob.location}</h3>
                  
                  <div className="prose max-w-none mb-6">
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedJob.description) }} />
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">How to Apply:</h4>
                    {selectedJob.applicationMethod.type === 'email' ? (
                      <p>Send your application to: <a href={`mailto:${selectedJob.applicationMethod.value}`} className="text-blue-600">
                        {selectedJob.applicationMethod.value}
                      </a></p>
                    ) : (
                      <p>Apply through our website: <a href={selectedJob.applicationMethod.value} className="text-blue-600" target="_blank" rel="noopener noreferrer">
                        {selectedJob.applicationMethod.value}
                      </a></p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-4 flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {isLoading ? 'Finding jobs...' : `${filteredJobs.length} ${filteredJobs.length === 1 ? 'Job' : 'Jobs'} Available`}
                  </h2>

                  {(Object.keys(filters).length > 0 || searchQuery) && (
                    <button
                      onClick={resetFiltersAndSearch}
                      className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      <span>Reset all filters</span>
                      {isLoading && <Loader className="ml-2 h-4 w-4 animate-spin" />}
                    </button>
                  )}
                </div>

                {error && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">{error}</p>
                        <button 
                          onClick={fetchJobs} 
                          className="mt-2 text-sm font-medium text-red-600 hover:text-red-500"
                        >
                          Retry loading jobs
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="bg-white rounded-lg shadow-sm p-6 h-32 animate-pulse" />
                    ))}
                  </div>
                ) : filteredJobs.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredJobs.map(job => (
                      <JobCard 
                        key={job.id} 
                        job={{
                          ...job,
                          description: DOMPurify.sanitize(job.description)
                        }} 
                        onClick={() => handleJobClick(job)}
                        onApply={() => handleApplyClick(job)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                    <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
                    <button
                      onClick={resetFiltersAndSearch}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Reset search and filters
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;