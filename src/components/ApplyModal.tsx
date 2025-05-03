import { useState } from "react";
import { jobService } from "../services/jobService";

const { applyToJob } = jobService;

interface ApplyModalProps {
  jobId: string;
  onClose: () => void;
}

const ApplyModal: React.FC<ApplyModalProps> = ({ jobId, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyToJob({ ...formData, jobId })
      .then(() => {
        alert("Application submitted!");
        onClose();
      })
      .catch(() => alert("Failed to submit application."));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
        >
          ×
        </button>
        <h2 className="text-xl font-semibold mb-4">Apply for this Job</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Your Name"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Your Email"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="resume"
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Resume Link (URL)"
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyModal;
