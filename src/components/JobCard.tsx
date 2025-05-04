import React from 'react';

interface JobCardProps {
  job: Job;
  onClick: () => void;
  onApply: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onClick, onApply }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow">
      <div onClick={onClick} className="cursor-pointer mb-4">
        <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
        <p className="text-gray-600 mb-2">{job.company} • {job.location}</p>
        <div className="prose prose-sm max-w-none text-gray-700 mb-4" 
             dangerouslySetInnerHTML={{ __html: job.description }} />
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{job.postedDate}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onApply();
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobCard;