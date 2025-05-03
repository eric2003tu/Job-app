import { useState } from "react";
import { Link } from "react-router-dom";
import ApplyModal from "./ApplyModal";

interface JobCardProps {
  job: {
    _id?: string;
    id?: string;
    title: string;
    company: string;
    location: string;
    type: string;
    description: string;
  };
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const [showModal, setShowModal] = useState(false);
  const jobId = job._id || job.id;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold mb-2">
          <Link to={`/job/${jobId}`} className="text-blue-600 hover:underline">
            {job.title}
          </Link>
        </h3>
        <p className="text-gray-700 mb-1">{job.company}</p>
        <p className="text-gray-500 text-sm mb-3">
          {job.location} • {job.type}
        </p>
        <p className="text-gray-600 text-sm line-clamp-3">
          {job.description}
        </p>
      </div>
      <button
        onClick={() => setShowModal(true)}
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Apply Now
      </button>

      {showModal && (
        <ApplyModal jobId={jobId} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default JobCard;
