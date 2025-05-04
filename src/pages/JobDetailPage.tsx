import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Job } from '../types';

interface JobDetailsProps {
  job: Job;
  onBack: () => void;
}

const JobDetails: React.FC<JobDetailsProps> = ({ job, onBack }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
      >
        <ArrowLeft className="mr-2" />
        Back to Jobs
      </button>
      
      <h1 className="text-2xl font-bold mb-4">{job.title}</h1>
      <p className="text-gray-700 mb-2"><strong>Company:</strong> {job.company}</p>
      <p className="text-gray-700 mb-2"><strong>Location:</strong> {job.location}</p>
      <p className="text-gray-700 mb-4"><strong>Employment Type:</strong> {job.employmentType}</p>
      <p className="text-gray-700 mb-4"><strong>Category:</strong> {job.category}</p>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Job Description</h2>
        <div 
          className="text-gray-700 mb-4 prose" 
          dangerouslySetInnerHTML={{ __html: job.description }} 
        />
      </div>
      
      {job.salary && (
        <p className="text-gray-700 mb-4"><strong>Salary:</strong> {job.salary}</p>
      )}

      {/* Application Section */}
      <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
        <h2 className="text-xl font-semibold mb-4 text-blue-800">How to Apply</h2>
        
        {job.applicationMethod?.type === 'email' ? (
          <div>
            <p className="text-gray-700 mb-2">Send your application to:</p>
            <a
              href={`mailto:${job.applicationMethod.value}?subject=Application for ${job.title} position`}
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Apply via Email: {job.applicationMethod.value}
            </a>
            <p className="text-sm text-gray-500 mt-2">
              Clicking will open your default email client
            </p>
          </div>
        ) : job.applicationMethod?.type === 'link' ? (
          <div>
            <p className="text-gray-700 mb-2">Apply through our website:</p>
            <a
              href={job.applicationMethod.value}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Apply Online Now
            </a>
            <p className="text-sm text-gray-500 mt-2">
              External link will open in a new tab
            </p>
          </div>
        ) : (
          <p className="text-gray-700">No application method specified</p>
        )}
      </div>
    </div>
  );
};

export default JobDetails;