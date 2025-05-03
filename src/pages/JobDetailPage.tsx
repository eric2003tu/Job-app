import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { jobService } from '../services/jobService';
import { Job } from '../types';
import ApplyModal from '../components/ApplyModal';
import { 
  MapPin, 
  Building, 
  Calendar, 
  Briefcase, 
  Mail, 
  ExternalLink, 
  Share2,
  ChevronLeft,
  Loader,
  Clock,
  Tag
} from 'lucide-react';

const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  
  useEffect(() => {
    const fetchJob = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const jobData = await jobService.getJobById(id);
        
        if (jobData) {
          setJob(jobData);
        } else {
          setError('Job not found');
        }
      } catch (err) {
        console.error('Error fetching job:', err);
        setError('Failed to load job details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchJob();
  }, [id]);
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const handleApply = () => {
    if (!job) return;
    
    if (job.applicationMethod.type === 'link') {
      window.open(job.applicationMethod.value, '_blank');
    } else {
      setIsApplyModalOpen(true);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <Loader className="h-8 w-8 text-blue-600 animate-spin" />
        <span className="ml-2 text-gray-600">Loading job details...</span>
      </div>
    );
  }
  
  if (error || !job) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg" role="alert">
          <p className="font-medium">Error</p>
          <p>{error || 'Job not found'}</p>
          <Link to="/" className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-800">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to jobs
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center mb-6 text-gray-600 hover:text-blue-600">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to all jobs
        </Link>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold">{job.title}</h1>
                <p className="text-blue-100 mt-1">{job.company}</p>
              </div>
              
              <button 
                onClick={handleApply}
                className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Apply Now
                {job.applicationMethod.type === 'email' ? (
                  <Mail className="ml-2 h-4 w-4" />
                ) : (
                  <ExternalLink className="ml-2 h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          
          <div className="border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              <div className="p-4 flex items-center">
                <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium text-gray-900">{job.location}</p>
                </div>
              </div>
              
              <div className="p-4 flex items-center">
                <Clock className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Posted Date</p>
                  <p className="font-medium text-gray-900">{formatDate(job.postedDate)}</p>
                </div>
              </div>
              
              <div className="p-4 flex items-center">
                <Tag className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Job Type</p>
                  <p className="font-medium text-gray-900">{job.employmentType || 'Not specified'}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="prose prose-blue max-w-none" dangerouslySetInnerHTML={{ __html: job.description }} />
          </div>
          
          <div className="bg-gray-50 p-6 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">How to Apply</h3>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-start">
              <div className="mr-3 mt-1">
                {job.applicationMethod.type === 'email' ? (
                  <Mail className="h-5 w-5 text-blue-500" />
                ) : (
                  <ExternalLink className="h-5 w-5 text-blue-500" />
                )}
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">
                  {job.applicationMethod.type === 'email' ? 'Send your resume to:' : 'Apply through this link:'}
                </p>
                <p className="text-blue-600 font-medium">
                  {job.applicationMethod.value}
                </p>
                <button 
                  onClick={handleApply}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {job.applicationMethod.type === 'email' ? 'Send Email Application' : 'Apply on Company Website'}
                </button>
              </div>
            </div>
          </div>
          
          <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
            <button 
              onClick={() => navigator.clipboard.writeText(window.location.href)}
              className="text-gray-500 hover:text-blue-600 inline-flex items-center text-sm"
            >
              <Share2 className="h-4 w-4 mr-1" />
              Share this job
            </button>
            
            <Link 
              to="/" 
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              See more jobs like this
            </Link>
          </div>
        </div>
      </div>

      {job && (
        <ApplyModal
          job={job}
          isOpen={isApplyModalOpen}
          onClose={() => setIsApplyModalOpen(false)}
        />
      )}
    </div>
  );
};

export default JobDetailPage;