import { Job } from '../types';

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'TechCorp Rwanda',
    location: 'Kigali, Rwanda',
    description: `
    <p>We are looking for a skilled Frontend Developer to join our growing team in Kigali. The ideal candidate will have experience with modern JavaScript frameworks and a passion for creating beautiful, responsive user interfaces.</p>
    
    <h3>Responsibilities:</h3>
    <ul>
      <li>Develop new user-facing features using React.js</li>
      <li>Build reusable components and libraries for future use</li>
      <li>Translate designs and wireframes into high-quality code</li>
      <li>Optimize applications for maximum performance</li>
    </ul>
    
    <h3>Requirements:</h3>
    <ul>
      <li>2+ years of experience with React.js</li>
      <li>Proficient understanding of web markup, including HTML5, CSS3</li>
      <li>Strong understanding of UI/UX design principles</li>
      <li>Knowledge of modern frontend build pipelines and tools</li>
    </ul>
    `,
    applicationMethod: {
      type: 'email',
      value: 'careers@techcorp.rw'
    },
    postedDate: '2025-01-15',
    salary: '$60,000 - $80,000',
    employmentType: 'Full-time',
    category: 'Technology'
  },
  {
    id: '2',
    title: 'Marketing Manager',
    company: 'Global Services Ltd',
    location: 'Remote, Rwanda',
    description: `
    <p>Global Services Ltd is seeking an experienced Marketing Manager to lead our marketing initiatives and drive growth. The successful candidate will be responsible for developing and implementing marketing strategies across digital and traditional channels.</p>
    
    <h3>Responsibilities:</h3>
    <ul>
      <li>Develop and manage marketing campaigns from concept to execution</li>
      <li>Analyze market trends and competitor activities</li>
      <li>Manage social media presence and digital marketing efforts</li>
      <li>Collaborate with sales team to support lead generation efforts</li>
    </ul>
    
    <h3>Requirements:</h3>
    <ul>
      <li>5+ years of experience in marketing roles</li>
      <li>Bachelor's degree in Marketing, Business, or related field</li>
      <li>Excellent analytical and project management skills</li>
      <li>Experience with digital marketing tools and analytics</li>
    </ul>
    `,
    applicationMethod: {
      type: 'link',
      value: 'https://careers.globalservices.rw/apply'
    },
    postedDate: '2025-01-20',
    salary: '$70,000 - $90,000',
    employmentType: 'Full-time',
    category: 'Marketing'
  },
  {
    id: '3',
    title: 'Administrative Assistant',
    company: 'Kigali International School',
    location: 'Kigali, Rwanda',
    description: `
    <p>Kigali International School is looking for an Administrative Assistant to support our administrative team. The ideal candidate will be organized, detail-oriented, and have excellent communication skills.</p>
    
    <h3>Responsibilities:</h3>
    <ul>
      <li>Manage office administrative activities</li>
      <li>Schedule appointments and meetings</li>
      <li>Prepare and organize documents</li>
      <li>Assist with student registration and records</li>
    </ul>
    
    <h3>Requirements:</h3>
    <ul>
      <li>2+ years of administrative experience</li>
      <li>Proficiency in MS Office applications</li>
      <li>Strong organizational and multitasking abilities</li>
      <li>Excellent verbal and written communication skills</li>
    </ul>
    `,
    applicationMethod: {
      type: 'email',
      value: 'hr@kigaliintl.edu.rw'
    },
    postedDate: '2025-01-25',
    salary: '$30,000 - $40,000',
    employmentType: 'Full-time',
    category: 'Administration'
  },
  {
    id: '4',
    title: 'Software Engineer',
    company: 'RwandaTech Solutions',
    location: 'Kigali, Rwanda',
    description: `
    <p>RwandaTech Solutions is hiring a Software Engineer to join our development team. You'll work on cutting-edge applications using modern technologies and best practices.</p>
    
    <h3>Responsibilities:</h3>
    <ul>
      <li>Design and develop software applications</li>
      <li>Write clean, maintainable, and efficient code</li>
      <li>Troubleshoot, debug and upgrade existing systems</li>
      <li>Collaborate with cross-functional teams</li>
    </ul>
    
    <h3>Requirements:</h3>
    <ul>
      <li>Bachelor's degree in Computer Science or related field</li>
      <li>3+ years of experience in software development</li>
      <li>Proficiency in at least one programming language (Java, Python, JavaScript)</li>
      <li>Experience with databases and API development</li>
    </ul>
    `,
    applicationMethod: {
      type: 'link',
      value: 'https://rwandatech.com/careers'
    },
    postedDate: '2025-01-18',
    salary: '$65,000 - $85,000',
    employmentType: 'Full-time',
    category: 'Technology'
  },
  {
    id: '5',
    title: 'Project Manager',
    company: 'Construction Partners Rwanda',
    location: 'Kigali, Rwanda',
    description: `
    <p>Construction Partners Rwanda is seeking an experienced Project Manager to oversee construction projects. The ideal candidate will have a background in construction management and excellent leadership skills.</p>
    
    <h3>Responsibilities:</h3>
    <ul>
      <li>Plan and schedule project timelines</li>
      <li>Manage project resources and budget</li>
      <li>Coordinate with contractors and suppliers</li>
      <li>Ensure compliance with safety regulations and quality standards</li>
    </ul>
    
    <h3>Requirements:</h3>
    <ul>
      <li>Bachelor's degree in Construction Management, Engineering, or related field</li>
      <li>5+ years of experience in construction project management</li>
      <li>Knowledge of construction methodologies and best practices</li>
      <li>Strong leadership and communication skills</li>
    </ul>
    `,
    applicationMethod: {
      type: 'email',
      value: 'careers@constructionpartners.rw'
    },
    postedDate: '2025-01-10',
    salary: '$75,000 - $95,000',
    employmentType: 'Contract',
    category: 'Construction'
  },
  {
    id: '6',
    title: 'Customer Service Representative',
    company: 'RwandaConnect Telecom',
    location: 'Kigali, Rwanda',
    description: `
    <p>RwandaConnect Telecom is looking for Customer Service Representatives to join our support team. The successful candidate will handle customer inquiries and provide exceptional service.</p>
    
    <h3>Responsibilities:</h3>
    <ul>
      <li>Answer customer inquiries via phone, email, and chat</li>
      <li>Resolve customer complaints and issues</li>
      <li>Process orders and service requests</li>
      <li>Maintain customer records</li>
    </ul>
    
    <h3>Requirements:</h3>
    <ul>
      <li>High school diploma or equivalent</li>
      <li>1+ year of customer service experience</li>
      <li>Excellent communication and problem-solving skills</li>
      <li>Proficiency in English and Kinyarwanda</li>
    </ul>
    `,
    applicationMethod: {
      type: 'link',
      value: 'https://rwandaconnect.rw/jobs'
    },
    postedDate: '2025-02-01',
    salary: '$25,000 - $35,000',
    employmentType: 'Full-time',
    category: 'Customer Service'
  },
];