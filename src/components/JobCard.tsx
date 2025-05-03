import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Briefcase, Building2, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
  index: number;
}

const JobCard: React.FC<JobCardProps> = ({ job, index }) => {
  const getDaysAgo = (dateString: string) => {
    const postedDate = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - postedDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Link 
        to={`/job/${job.id}`}
        className="group block bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden hover:border-blue-200"
      >
        <div className="p-6">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 truncate">
                    {job.title}
                  </h3>
                  <p className="text-gray-600 truncate">{job.company}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-500">
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                  <MapPin className="h-3.5 w-3.5 mr-1" />
                  {job.location}
                </div>
                
                {job.employmentType && (
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                    <Briefcase className="h-3.5 w-3.5 mr-1" />
                    {job.employmentType}
                  </div>
                )}
                
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  {getDaysAgo(job.postedDate)}
                </div>
              </div>

              {job.salary && (
                <div className="mt-3 text-sm font-medium text-gray-900">
                  {job.salary}
                </div>
              )}
            </div>

            <div className="flex-shrink-0">
              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
            </div>
          </div>

          {job.category && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {job.category}
              </span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default JobCard;