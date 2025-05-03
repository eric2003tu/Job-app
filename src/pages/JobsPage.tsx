import React, { useState, useEffect } from 'react';
import { jobService } from '../services/jobService';
import { Job } from '../types';
import JobCard from '../components/JobCard';
import SearchBar from '../components/SearchBar';
import JobFilters from '../components/JobFilters';
import { Loader } from 'lucide-react';

const JobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const jobData = await jobService.getJobs();
        setJobs(jobData);
        setFilteredJobs(jobData);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load jobs. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    // Apply filters and search query to jobs
    let result = [...jobs];
    
    // Apply search if present
    if (searchQuery) {
      result = result.filter(job => {
        const searchableText = `${job.title} ${job.company} ${job.location} ${job.description} ${job.category || ''}`.toLowerCase();
        return searchableText.includes(searchQuery.toLowerCase());
      });
    }
    
    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        result = result.filter(job => job[key as keyof Job] === value);
      }
    });
    
    setFilteredJobs(result);
  }, [jobs, searchQuery, filters]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (query.trim()) {
      try {
        setIsLoading(true);
        const results = await jobService.searchJobs(query);
        setFilteredJobs(results);
      } catch (err) {
        console.error('Error searching jobs:', err);
        setError('Search failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      // If search is cleared, reset to filtered view of all jobs
      setFilteredJobs(jobs);
    }
  };

  const handleFilterChange = (newFilters: Record<string, string>) => {
    setFilters(newFilters);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white mb-4">Find Your Dream Job in Rwanda</h1>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Browse thousands of job opportunities across Rwanda and take the next step in your career journey.
            </p>
          </div>
          
          <SearchBar onSearch={handleSearch} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <JobFilters onFilterChange={handleFilterChange} filters={filters} />
          </div>
          
          <div className="lg:col-span-3">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                {isLoading ? 'Finding jobs...' : `${filteredJobs.length} Jobs Available`}
              </h2>
              
              {Object.keys(filters).length > 0 && (
                <button 
                  onClick={() => setFilters({})}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear all filters
                </button>
              )}
            </div>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader className="h-8 w-8 text-blue-600 animate-spin" />
                <span className="ml-2 text-gray-600">Loading jobs...</span>
              </div>
            ) : filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {filteredJobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
                <p className="text-gray-500">No jobs found matching your criteria.</p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setFilters({});
                    setFilteredJobs(jobs);
                  }}
                  className="mt-4 text-blue-600 hover:text-blue-800"
                >
                  Reset search and filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;