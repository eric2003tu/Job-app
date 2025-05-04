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
      <p className="text-gray-700 mb-4"><strong>Description:</strong> {job.description}</p>
      <p className="text-gray-700 mb-4"><strong>Category:</strong> {job.category}</p>
      {job.applicationEmail && (
        <p className="text-gray-700 mb-4">
          <strong>Application Email:</strong>{' '}
          <a
            href={`mailto:${job.applicationEmail}`}
            className="text-blue-600 hover:underline"
          >
            {job.applicationEmail}
          </a>
        </p>
      )}
      {job.applicationLink && (
        <p className="text-gray-700">
          <strong>Application Link:</strong>{' '}
          <a
            href={job.applicationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {job.applicationLink}
          </a>
        </p>
      )}
    </div>
  );
};

export default JobDetails;