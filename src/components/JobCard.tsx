interface JobCardProps {
  job: {
    _id?: string;
    id?: string;
    title: string;
    company: string;
    location: string;
    type: string;
    description: string;
    category?: string;
    applicationEmail?: string;
    applicationLink?: string;
  };
  onApplyClick: (job: any) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onApplyClick }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between h-full">
      <div>
        <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
        <p className="text-gray-700 mb-1">{job.company}</p>
        <p className="text-gray-500 text-sm mb-3">
          {job.location} • {job.type}
        </p>
        <p className="text-gray-600 text-sm line-clamp-3">{job.description}</p>
      </div>
      <button
        onClick={() => onApplyClick(job)}
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 text-center w-full"
      >
        Apply Now
      </button>
    </div>
  );
};

export default JobCard;