export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  applicationMethod: {
    type: 'email' | 'link';
    value: string;
  };
  postedDate: string;
  salary?: string;
  employmentType?: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  category?: string;
}