import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { jobService } from '../services/jobService';
import { Job } from '../types';
import JobCard from '../components/JobCard';
import SearchBar from '../components/SearchBar';
import JobFilters from '../components/JobFilters';
import { Loader } from 'lucide-react';
import JobDetails from './JobDetailPage';
import { FaArrowLeft } from "react-icons/fa";

const JobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const response = await jobService.getAllJobs();

        if (response && Array.isArray(response.data)) {
          setJobs(response.data);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load jobs. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    if (searchQuery) {
      result = result.filter(job => {
        const searchableText = `${job.title} ${job.company} ${job.location} ${job.description} ${job.category || ''}`.toLowerCase();
        return searchableText.includes(searchQuery.toLowerCase());
      });
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        result = result.filter(job => 
          String(job[key as keyof Job]).toLowerCase() === String(value).toLowerCase()
        );
      }
    });

    return result;
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

  const handleJobClick = useCallback((job: Job) => {
    setSelectedJob(job);
    // Scroll to top when viewing job details
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBackToList = useCallback(() => {
    setSelectedJob(null);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Persistent Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white mb-4">Find Your Dream Job</h1>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Browse thousands of job opportunities and take the next step in your career journey.
            </p>
          </div>
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Persistent Filters */}
          <div className="lg:col-span-1">
            <JobFilters 
              onFilterChange={handleFilterChange} 
              filters={filters} 
              availableCategories={[...new Set(jobs.map(job => job.category))]}
            />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {selectedJob ? (
              // Job Details View
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">

                <JobDetails job={selectedJob} onBack={handleBackToList} />
              </div>
            ) : (
              // Jobs List View
              <>
                <div className="mb-4 flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {isLoading ? 'Finding jobs...' : `${filteredJobs.length} Jobs Available`}
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
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{error}</span>
                    <button 
                      onClick={() => setError('')} 
                      className="absolute top-0 right-0 px-2 py-1"
                      aria-label="Dismiss error"
                    >
                      &times;
                    </button>
                  </div>
                )}

                {isLoading ? (
                  <div className="flex justify-center items-center py-12">
                    <Loader className="h-8 w-8 text-blue-600 animate-spin" />
                    <span className="ml-2 text-gray-600">Loading jobs...</span>
                  </div>
                ) : filteredJobs.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredJobs.map(job => (
                      <JobCard 
                        key={job.id || job._id} 
                        job={job} 
                        onApplyClick={handleJobClick}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                    <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
                    <button
                      onClick={resetFiltersAndSearch}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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