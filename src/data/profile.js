// Source of truth: Resume/SuhasHRResume.pdf. Do not add facts that are not in the resume.
// The phone number is intentionally omitted from the website (it remains in the PDF).

export const profile = {
  name: 'Suhas H R',
  shortName: 'Suhas',
  role: 'Lead Software Engineer',
  headline: ['Lead Software Engineer', 'Cloud Platform Engineer', 'Full-Stack Developer'],
  // Hero second line, a condensed reading of the resume summary.
  tagline: 'I build cloud-native platforms at scale.',
  location: 'Bengaluru, India',
  intro:
    "I'm a Lead Software Engineer at Samsung Research India with 5+ years of experience designing and delivering scalable cloud-native platforms, distributed systems, and IoT solutions — owning products end-to-end, from architecture and database design to production.",
  summary: [
    'Lead Software Engineer with 5+ years of experience designing and delivering scalable cloud-native platforms, distributed systems, and IoT solutions.',
    'I have a track record of owning products end-to-end: from architecture and database design to backend services, frontend development, production deployment, and operational excellence.',
    'I have led large-scale cloud migrations, built AI-powered developer tools, and designed highly scalable microservices on AWS. My strongest areas are DynamoDB data modeling, distributed architectures, and platform engineering.',
  ],
  focusAreas: [
    'Cloud-native platforms and microservices on AWS',
    'DynamoDB data modeling and large-scale data migration',
    'Distributed systems and IoT platforms',
    'AI-powered developer tooling with LLMs and LangChain',
    'UI test automation and release quality',
  ],
  email: 'hrsuhas15@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/hrsuhas15',
    github: 'https://github.com/hrsuhas15',
  },
  // Relative to the Vite base path; the file lives in public/resume.pdf.
  resumePath: 'resume.pdf',
  // Profile picture: put a square image (~600×600) in public/, e.g. public/profile.jpg,
  // then set this to 'profile.jpg'. While null, the site shows your initials instead.
  photo: null,
  initials: 'SH',
}

// Qualitative achievements stated in the resume. No metrics are claimed because none are documented.
export const achievements = [
  {
    title: 'Zero-downtime database migration',
    description:
      'Led the migration of production-scale data from Apache Cassandra to Amazon DynamoDB with zero downtime, including the migration strategy, data consistency validation, and production cutover.',
    projectSlug: 'cassandra-to-dynamodb-migration',
  },
  {
    title: 'End-to-end platform ownership',
    description:
      'Owned the architecture, design, and delivery of the Catalogs Web Portal used by manufacturers to manage IoT device metadata and configurations across the Samsung IoT ecosystem.',
    projectSlug: 'catalogs-web-portal',
  },
  {
    title: 'Standardised UI automation',
    description:
      'Championed Playwright as the standard UI automation framework, improving regression testing quality, increasing automation coverage, and accelerating release cycles.',
    projectSlug: 'playwright-ui-automation',
  },
  {
    title: 'Multiple production releases',
    description:
      'Delivered several large-scale IoT platform capabilities and multiple production releases in collaboration with product managers, architects, QA, and cross-functional engineering teams.',
    projectSlug: null,
  },
]
