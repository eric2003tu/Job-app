// Updated to ensure `jobService.createJob` is defined
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobService } from '../services/jobService';
import { Job } from '../types';
import { Check, AlertTriangle, Loader } from 'lucide-react';

type FormErrors = {
  [key: string]: string;
};

const PostJobPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    applicationMethod: {
      type: 'email',
      value: ''
    },
    employmentType: 'Full-time',
    category: '',
    salary: ''
  });
  
  const employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];
  const categories = ['Technology', 'Marketing', 'Administration', 'Customer Service', 'Construction', 'Other'];
  
  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Job title is required';
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Job description is required';
    } else if (formData.description.length < 50) {
      newErrors.description = 'Description should be at least 50 characters';
    }
    
    if (!formData.applicationMethod.value.trim()) {
      newErrors.applicationValue = 'Application method value is required';
    } else if (
      formData.applicationMethod.type === 'email' && 
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.applicationMethod.value)
    ) {
      newErrors.applicationValue = 'Please enter a valid email address';
    } else if (
      formData.applicationMethod.type === 'link' && 
      !/^(https?:\/\/)/.test(formData.applicationMethod.value)
    ) {
      newErrors.applicationValue = 'Please enter a valid URL starting with http:// or https://';
    }
    
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'applicationType') {
      setFormData({
        ...formData,
        applicationMethod: {
          ...formData.applicationMethod,
          type: value as 'email' | 'link'
        }
      });
    } else if (name === 'applicationValue') {
      setFormData({
        ...formData,
        applicationMethod: {
          ...formData.applicationMethod,
          value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Format the description with HTML
      const formattedDescription = `
        <p>${formData.description.replace(/\n/g, '</p><p>')}</p>
      `;
      
      const jobData: Omit<Job, 'id'> = {
        ...formData,
        description: formattedDescription,
        postedDate: new Date().toISOString().split('T')[0]
      };
      
      const newJob = await jobService.createJob(jobData);
      
      setSuccessMessage('Job posted successfully!');
      
      // Reset form
      setFormData({
        title: '',
        company: '',
        location: '',
        description: '',
        applicationMethod: {
          type: 'email',
          value: ''
        },
        employmentType: 'Full-time',
        category: '',
        salary: ''
      });
      
      // Redirect to job detail page after a brief delay
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (error) {
      console.error('Error posting job:', error);
      setErrors({
        submit: 'Failed to post job. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
            <h1 className="text-2xl font-bold">Post a New Job</h1>
            <p className="text-blue-100 mt-1">Fill in the form below to post your job opening</p>
          </div>
          
          {successMessage && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 m-6">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <p className="text-green-700">{successMessage}</p>
              </div>
              <p className="text-green-600 text-sm mt-2">Redirecting to your job posting...</p>
            </div>
          )}
          
          {errors.submit && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 m-6">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                <p className="text-red-700">{errors.submit}</p>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title*
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full rounded-md border ${errors.title ? 'border-red-300' : 'border-gray-300'} shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="e.g. Frontend Developer"
                />
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name*
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className={`w-full rounded-md border ${errors.company ? 'border-red-300' : 'border-gray-300'} shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="e.g. TechCorp Rwanda"
                />
                {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location*
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={`w-full rounded-md border ${errors.location ? 'border-red-300' : 'border-gray-300'} shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="e.g. Kigali, Rwanda"
                />
                {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
              </div>
              
              <div>
                <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
                  Salary Range (optional)
                </label>
                <input
                  type="text"
                  id="salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. $40,000 - $60,000"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="employmentType" className="block text-sm font-medium text-gray-700 mb-1">
                  Employment Type*
                </label>
                <select
                  id="employmentType"
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {employmentTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category*
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full rounded-md border ${errors.category ? 'border-red-300' : 'border-gray-300'} shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
              </div>
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Job Description*
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={6}
                className={`w-full rounded-md border ${errors.description ? 'border-red-300' : 'border-gray-300'} shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Describe the job responsibilities, requirements, benefits, etc."
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                How to Apply*
              </label>
              
              <div className="flex items-center space-x-4 mb-3">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="email"
                    name="applicationType"
                    value="email"
                    checked={formData.applicationMethod.type === 'email'}
                    onChange={handleInputChange}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                  />
                  <label htmlFor="email" className="ml-2 block text-sm text-gray-700">
                    Email
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="link"
                    name="applicationType"
                    value="link"
                    checked={formData.applicationMethod.type === 'link'}
                    onChange={handleInputChange}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                  />
                  <label htmlFor="link" className="ml-2 block text-sm text-gray-700">
                    Website Link
                  </label>
                </div>
              </div>
              
              <input
                type={formData.applicationMethod.type === 'email' ? 'email' : 'url'}
                id="applicationValue"
                name="applicationValue"
                value={formData.applicationMethod.value}
                onChange={handleInputChange}
                className={`w-full rounded-md border ${errors.applicationValue ? 'border-red-300' : 'border-gray-300'} shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                placeholder={formData.applicationMethod.type === 'email' ? 'careers@company.com' : 'https://company.com/careers/apply'}
              />
              {errors.applicationValue && <p className="mt-1 text-sm text-red-600">{errors.applicationValue}</p>}
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="h-4 w-4 mr-2 animate-spin" />
                    Posting Job...
                  </>
                ) : 'Post Job'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJobPage;