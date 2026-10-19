// Employment history, from the resume only. Dates are shown exactly as documented.
export const experience = [
  {
    id: 'samsung-research-india',
    company: 'Samsung Research India',
    role: 'Lead Software Engineer',
    location: 'Bengaluru, India',
    start: 'January 2021',
    end: 'Present',
    summary:
      'Architecture, design, and end-to-end delivery of IoT platform software for the Samsung IoT ecosystem.',
    highlights: [
      'Owned the architecture, design, and end-to-end delivery of the Catalogs Web Portal, enabling manufacturers to efficiently manage IoT device metadata and configurations across the Samsung IoT ecosystem.',
      'Led the complete software development lifecycle, including DynamoDB data model design, backend service implementation, REST API development, business logic, and Vue.js-based web interfaces.',
      'Delivered multiple large-scale IoT platform capabilities, including Offline Diagnostics, Device Discovery Optimization, Need Info Guide, Catalog Management, and Resource Management.',
      'Led the migration of production-scale data from Apache Cassandra to Amazon DynamoDB with zero downtime, including the migration strategy, data consistency validation, and production cutover, using an optimised single-table design in DynamoDB.',
      'Championed the adoption of Playwright as the standard UI automation framework, improving regression testing quality, increasing automation coverage, and accelerating release cycles.',
      'Collaborated closely with product managers, architects, QA teams, and cross-functional engineering teams to deliver multiple production releases.',
    ],
    capabilities: [
      'Offline Diagnostics',
      'Device Discovery Optimization',
      'Need Info Guide',
      'Catalog Management',
      'Resource Management',
    ],
    technologies: ['Amazon DynamoDB', 'Apache Cassandra', 'REST APIs', 'Vue.js', 'Playwright'],
    projectSlugs: ['catalogs-web-portal', 'cassandra-to-dynamodb-migration', 'playwright-ui-automation'],
  },
]

export const education = [
  {
    id: 'iisc',
    degree: 'Master of Technology (Online)',
    field: 'Data Science and Business Analytics',
    institution: 'Indian Institute of Science, Bengaluru',
    start: '2023',
    end: '2025',
  },
  {
    id: 'rvce',
    degree: 'Bachelor of Engineering',
    field: 'Information Science and Engineering',
    institution: 'RV College of Engineering, Bengaluru',
    start: '2016',
    end: '2020',
  },
]
