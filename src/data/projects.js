/**
 * Project case studies.
 *
 * Content rules (see README → "Content integrity"):
 * - kind: 'documented' → paraphrases facts stated in the resume.
 * - kind: 'context'    → general engineering explanation. Rendered with a
 *   "General technical context" badge and never phrased as a personal result.
 * - diagram.conceptual → the diagram illustrates a typical approach, not the
 *   confirmed production architecture.
 * - reviewNotes        → information that is missing from the resume. Shown
 *   only in development builds so the owner can fill the gaps.
 *
 * To add a project, append an entry with a unique slug. No new page component
 * is needed; /projects/:slug renders it automatically.
 */

export const projects = [
  {
    slug: 'catalogs-web-portal',
    title: 'Catalogs Web Portal',
    subtitle: 'IoT device metadata and configuration management for manufacturers',
    category: 'Full-Stack Platform',
    context: 'Samsung Research India',
    featured: true,
    summary:
      'A web portal that lets manufacturers manage IoT device metadata and configurations across the Samsung IoT ecosystem. I owned its architecture, design, and end-to-end delivery.',
    problem:
      'Manufacturers needed an efficient way to manage the metadata and configuration of their IoT devices across the Samsung IoT ecosystem.',
    outcome:
      'Delivered end-to-end — data model, backend services, REST APIs, and Vue.js interfaces — through multiple production releases.',
    tags: ['Vue.js', 'Amazon DynamoDB', 'REST APIs', 'IoT'],
    sections: [
      {
        id: 'overview',
        title: 'Project overview',
        kind: 'documented',
        body: [
          'The Catalogs Web Portal enables manufacturers to efficiently manage IoT device metadata and configurations across the Samsung IoT ecosystem.',
          'I owned the architecture, design, and end-to-end delivery of the portal, covering the full stack from the DynamoDB data model to the Vue.js user interface.',
        ],
      },
      {
        id: 'background',
        title: 'Background: why device catalogs matter',
        kind: 'context',
        body: [
          'In a connected-device ecosystem, a catalog typically acts as the shared reference that describes each device model: what it is, what it supports, and how it should be configured. Other platform services can then read that information instead of hard-coding device-specific behaviour.',
          'Because many parties depend on the same records, a catalog system generally needs clear ownership boundaries, validation on write, and predictable read performance.',
        ],
      },
      {
        id: 'role',
        title: 'My role and contributions',
        kind: 'documented',
        list: [
          'Owned the architecture, design, and end-to-end delivery of the portal.',
          'Designed the DynamoDB data model.',
          'Implemented backend services and the business logic layer.',
          'Developed the REST APIs consumed by the web interface.',
          'Built the Vue.js-based web interfaces used by manufacturers.',
          'Worked with product managers, architects, QA teams, and cross-functional engineering teams across multiple production releases.',
        ],
      },
      {
        id: 'architecture',
        title: 'Technical architecture',
        kind: 'context',
        diagram: true,
        body: [
          'The resume confirms four layers: a Vue.js web interface, REST APIs, backend services with business logic, and a DynamoDB data model. The diagram below shows how these layers commonly fit together; it is a conceptual view, not a description of the internal production system.',
        ],
      },
      {
        id: 'technologies',
        title: 'Technologies and why they fit',
        kind: 'context',
        intro: 'Technologies are from the resume; the rationale describes general strengths of each choice.',
        items: [
          {
            name: 'Vue.js',
            note: 'Component-based UI framework well suited to form-heavy, data-management interfaces such as catalog editors.',
          },
          {
            name: 'REST APIs',
            note: 'A resource-oriented contract decouples the web UI from backend services, so either side can evolve and other clients can reuse the same endpoints.',
          },
          {
            name: 'Amazon DynamoDB',
            note: 'A managed key-value and document store with predictable latency at scale; schema design starts from access patterns rather than normalised tables.',
          },
        ],
      },
      {
        id: 'decisions',
        title: 'Key engineering considerations',
        kind: 'context',
        list: [
          'Access-pattern-first modeling: in DynamoDB, the keys and indexes are chosen from the queries the application must serve, which must be understood before the schema is fixed.',
          'Separation of concerns: keeping validation and business rules in backend services, not the UI, keeps data consistent regardless of which client writes it.',
          'API-first contracts: defining REST resources early lets frontend and backend work proceed in parallel.',
        ],
      },
      {
        id: 'platform',
        title: 'Related platform capabilities',
        kind: 'documented',
        body: [
          'In the same role, I delivered multiple large-scale IoT platform capabilities:',
        ],
        list: [
          'Offline Diagnostics',
          'Device Discovery Optimization',
          'Need Info Guide',
          'Catalog Management',
          'Resource Management',
        ],
      },
      {
        id: 'results',
        title: 'Results',
        kind: 'documented',
        body: [
          'The portal was delivered end-to-end and shipped through multiple production releases, giving manufacturers a way to manage device metadata and configurations across the Samsung IoT ecosystem.',
        ],
      },
    ],
    diagram: {
      title: 'Catalogs Web Portal — layered architecture',
      description:
        'Manufacturers use a Vue.js web interface that calls REST APIs. Backend services apply business logic and read and write device metadata in Amazon DynamoDB.',
      conceptual: true,
      width: 760,
      height: 220,
      nodes: [
        { id: 'user', label: 'Manufacturer', sublabel: 'browser', x: 20, y: 80 },
        { id: 'ui', label: 'Vue.js web UI', sublabel: 'catalog screens', x: 200, y: 80, tone: 'accent' },
        { id: 'api', label: 'REST APIs', sublabel: 'resource endpoints', x: 380, y: 80, tone: 'accent' },
        { id: 'svc', label: 'Backend services', sublabel: 'business logic', x: 560, y: 20, tone: 'accent' },
        { id: 'db', label: 'Amazon DynamoDB', sublabel: 'device metadata', x: 560, y: 140, tone: 'store' },
      ],
      edges: [
        { from: 'user', to: 'ui' },
        { from: 'ui', to: 'api', label: 'HTTPS' },
        { from: 'api', to: 'svc' },
        { from: 'svc', to: 'db', label: 'read / write' },
      ],
    },
    related: ['cassandra-to-dynamodb-migration', 'playwright-ui-automation', 'ai-catalog-assistant'],
    reviewNotes: [
      'Scale (number of manufacturers, device models, or records) is not in the resume.',
      'Whether Node.js, Spring Boot, AWS Lambda, or Amazon S3 were used for this portal is not stated.',
      'No measurable outcomes (time saved, adoption) are documented.',
    ],
  },

  {
    slug: 'cassandra-to-dynamodb-migration',
    title: 'Zero-Downtime Cassandra → DynamoDB Migration',
    subtitle: 'Moving production-scale data to a single-table DynamoDB design',
    category: 'Data & Cloud',
    context: 'Samsung Research India',
    featured: true,
    summary:
      'Led the migration of production-scale data from Apache Cassandra to Amazon DynamoDB with zero downtime, including strategy, consistency validation, and production cutover, using an optimised single-table design.',
    problem:
      'Production data had to move from Apache Cassandra to Amazon DynamoDB without taking the service offline.',
    outcome:
      'Completed with zero downtime: migration strategy, data consistency validation, and production cutover onto an optimised single-table design.',
    tags: ['Amazon DynamoDB', 'Apache Cassandra', 'Data Migration', 'Single-Table Design'],
    sections: [
      {
        id: 'overview',
        title: 'Project overview',
        kind: 'documented',
        body: [
          'I led the migration of production-scale data from Apache Cassandra to Amazon DynamoDB with zero downtime. The work covered the migration strategy, data consistency validation, and the production cutover.',
          'The target schema used an optimised single-table design in DynamoDB.',
        ],
      },
      {
        id: 'goals',
        title: 'Goals and constraints',
        kind: 'documented',
        list: [
          'Zero downtime: the system had to stay available throughout the migration.',
          'Data consistency: migrated data had to be validated against the source before cutover.',
          'Production cutover: traffic had to move to DynamoDB in a controlled way.',
        ],
      },
      {
        id: 'role',
        title: 'My role',
        kind: 'documented',
        body: [
          'I led the migration end-to-end: defining the migration strategy, validating data consistency, and executing the production cutover.',
        ],
      },
      {
        id: 'single-table',
        title: 'What single-table design means',
        kind: 'context',
        body: [
          'In single-table design, several entity types share one DynamoDB table. Each item has a generic partition key (PK) and sort key (SK) whose values encode the entity type and relationships, for example PK = DEVICE#123 and SK = CONFIG#v2.',
          'Related items that share a partition key form an "item collection" that can be fetched with one Query, replacing joins. Global secondary indexes add alternative access paths. The benefit is fewer round-trips and predictable performance; the cost is a schema that is harder to read and must be designed from known access patterns.',
        ],
      },
      {
        id: 'architecture',
        title: 'A typical zero-downtime migration flow',
        kind: 'context',
        diagram: true,
        body: [
          'The resume does not detail the exact mechanism used. The diagram shows a widely used pattern for zero-downtime database migrations, included to explain the concepts involved.',
        ],
      },
      {
        id: 'approach',
        title: 'Common implementation phases',
        kind: 'context',
        list: [
          'Model access patterns and design the target keys and indexes.',
          'Start writing new changes to both stores (dual-write or change-data-capture) so the target stays current.',
          'Backfill historical data in idempotent, resumable batches.',
          'Validate: compare record counts and field-level checksums between source and target.',
          'Shadow reads: serve from the source while comparing responses from the target.',
          'Cut over reads, then writes, behind a switch that can be rolled back; decommission the source afterwards.',
        ],
      },
      {
        id: 'challenges',
        title: 'Typical challenges in Cassandra → DynamoDB moves',
        kind: 'context',
        list: [
          'Data model translation: Cassandra wide rows and clustering columns must map to partition and sort keys within DynamoDB item-size limits.',
          'Hot partitions: key choices that were fine in Cassandra can concentrate traffic on a single DynamoDB partition.',
          'Consistency semantics differ (tunable consistency vs. eventually or strongly consistent reads), which affects validation timing.',
          'Backfill throughput has to be balanced against live traffic and provisioned capacity.',
        ],
      },
      {
        id: 'results',
        title: 'Results',
        kind: 'documented',
        body: [
          'The migration was completed with zero downtime, including consistency validation and production cutover onto an optimised single-table DynamoDB design.',
        ],
      },
    ],
    diagram: {
      title: 'Zero-downtime migration — common pattern',
      description:
        'The application writes to both Apache Cassandra and Amazon DynamoDB. A backfill job copies historical data from Cassandra to DynamoDB. A validator compares both stores. After validation, a cutover switch moves reads and writes to DynamoDB.',
      conceptual: true,
      width: 760,
      height: 300,
      nodes: [
        { id: 'app', label: 'Application', sublabel: 'services', x: 20, y: 120, tone: 'accent' },
        { id: 'cass', label: 'Apache Cassandra', sublabel: 'source', x: 300, y: 20, tone: 'store' },
        { id: 'ddb', label: 'Amazon DynamoDB', sublabel: 'single-table target', x: 300, y: 220, tone: 'store' },
        { id: 'backfill', label: 'Backfill job', sublabel: 'batched, idempotent', x: 560, y: 20 },
        { id: 'validate', label: 'Validator', sublabel: 'counts & checksums', x: 560, y: 220 },
      ],
      edges: [
        { from: 'app', to: 'cass', label: 'write' },
        { from: 'app', to: 'ddb', label: 'dual-write' },
        { from: 'cass', to: 'backfill' },
        { from: 'backfill', to: 'ddb', label: 'copy' },
        { from: 'ddb', to: 'validate' },
      ],
    },
    related: ['catalogs-web-portal', 'multi-cloud-workload-optimization'],
    reviewNotes: [
      'Data volume, number of tables, and migration duration are not in the resume.',
      'The actual mechanism (dual-write, CDC, tooling) is not documented; the flow shown is a common pattern.',
      'Reasons for leaving Cassandra and any cost or latency changes are not documented.',
    ],
  },

  {
    slug: 'playwright-ui-automation',
    title: 'Playwright as the Standard UI Automation Framework',
    subtitle: 'Raising regression quality and release speed',
    category: 'Quality Engineering',
    context: 'Samsung Research India',
    featured: false,
    summary:
      'Championed the adoption of Playwright as the standard UI automation framework, improving regression testing quality, increasing automation coverage, and accelerating release cycles.',
    problem:
      'UI regression testing needed better quality and coverage to support faster releases.',
    outcome:
      'Playwright became the standard framework, with improved regression quality, higher automation coverage, and faster release cycles.',
    tags: ['Playwright', 'Test Automation', 'CI/CD'],
    sections: [
      {
        id: 'overview',
        title: 'Project overview',
        kind: 'documented',
        body: [
          'I championed the adoption of Playwright as the standard UI automation framework. The change improved regression testing quality, increased automation coverage, and accelerated release cycles.',
        ],
      },
      {
        id: 'role',
        title: 'My role',
        kind: 'documented',
        body: [
          'I drove the adoption, making Playwright the standard rather than one option among several, and worked alongside QA and engineering teams who relied on the regression suite for production releases.',
        ],
      },
      {
        id: 'why-playwright',
        title: 'Why Playwright suits regression testing',
        kind: 'context',
        items: [
          { name: 'Auto-waiting', note: 'Actions wait for elements to be actionable, removing many sources of flaky, timing-dependent tests.' },
          { name: 'Cross-browser', note: 'One API drives Chromium, Firefox, and WebKit.' },
          { name: 'Isolation', note: 'Each test gets a fresh browser context, so tests do not leak state into each other.' },
          { name: 'Parallelism', note: 'Tests run in parallel workers out of the box, keeping suites fast as they grow.' },
          { name: 'Debuggability', note: 'Traces, screenshots, and videos make CI failures reproducible.' },
        ],
      },
      {
        id: 'architecture',
        title: 'Where UI automation sits in delivery',
        kind: 'context',
        diagram: true,
        body: [
          'The diagram shows a common way a UI regression suite gates releases in a CI/CD pipeline. It is a conceptual view of the practice, not a description of a specific internal pipeline.',
        ],
      },
      {
        id: 'approach',
        title: 'Typical adoption approach',
        kind: 'context',
        list: [
          'Pilot on a high-value user journey to demonstrate stability and speed.',
          'Establish shared fixtures, page objects, and conventions so tests stay maintainable.',
          'Run the suite in CI on every change and publish traces for failures.',
          'Grow coverage of regression scenarios incrementally.',
        ],
      },
      {
        id: 'results',
        title: 'Results',
        kind: 'documented',
        list: [
          'Improved regression testing quality.',
          'Increased automation coverage.',
          'Accelerated release cycles.',
        ],
      },
    ],
    diagram: {
      title: 'UI regression in CI/CD — common pattern',
      description:
        'A code change triggers the CI pipeline, which builds the app and runs the Playwright suite in parallel across browsers. Reports and traces feed a release decision.',
      conceptual: true,
      width: 760,
      height: 200,
      nodes: [
        { id: 'change', label: 'Code change', sublabel: 'pull request', x: 20, y: 70 },
        { id: 'ci', label: 'CI pipeline', sublabel: 'build & deploy to test', x: 200, y: 70 },
        { id: 'pw', label: 'Playwright suite', sublabel: 'parallel workers', x: 380, y: 70, tone: 'accent' },
        { id: 'release', label: 'Release', sublabel: 'gated on results', x: 560, y: 70, tone: 'store' },
      ],
      edges: [
        { from: 'change', to: 'ci' },
        { from: 'ci', to: 'pw' },
        { from: 'pw', to: 'release', label: 'pass' },
      ],
    },
    related: ['catalogs-web-portal', 'ai-catalog-assistant'],
    reviewNotes: [
      'The previous framework or manual process is not documented.',
      'Coverage percentages, suite size, and release-cycle timings are not documented.',
    ],
  },

  {
    slug: 'ai-catalog-assistant',
    title: 'AI-Powered Catalog Assistant',
    subtitle: 'Natural-language catalog updates and Jira workflow automation',
    category: 'AI & Automation',
    context: null,
    featured: true,
    summary:
      'An AI-enabled assistant that understands natural-language requests to update catalog information and automate Jira ticket workflows, built with LLMs and LangChain.',
    problem:
      'Updating catalog information and handling Jira ticket workflows required manual, step-by-step work.',
    outcome:
      'Built an assistant that turns natural-language requests into catalog updates and Jira workflow actions.',
    tags: ['LangChain', 'Python', 'FastAPI', 'LLM Integration'],
    sections: [
      {
        id: 'overview',
        title: 'Project overview',
        kind: 'documented',
        body: [
          'I developed an AI-enabled assistant that understands natural-language requests to update catalog information and automate Jira ticket workflows, using large language models (LLMs) and LangChain.',
        ],
        list: ['Technology stack: LangChain, Python, FastAPI'],
      },
      {
        id: 'architecture',
        title: 'How an LLM assistant like this is typically structured',
        kind: 'context',
        diagram: true,
        body: [
          'The resume confirms the stack (Python, FastAPI, LangChain) and the two capabilities (catalog updates and Jira workflows). The diagram shows a common structure for this kind of tool-using assistant; it is conceptual.',
        ],
      },
      {
        id: 'technologies',
        title: 'Technologies and why they fit',
        kind: 'context',
        items: [
          { name: 'Python', note: 'The primary ecosystem for LLM tooling and integrations.' },
          { name: 'FastAPI', note: 'A lightweight async web framework with request validation, well suited to exposing an assistant as an HTTP service.' },
          { name: 'LangChain', note: 'Provides abstractions for prompts, model calls, and "tools" — functions the LLM can choose to call, such as an update-catalog or create-ticket action.' },
        ],
      },
      {
        id: 'flow',
        title: 'Request flow',
        kind: 'context',
        list: [
          'A user writes a request in plain language.',
          'The LLM interprets intent and extracts structured parameters (which item, which field, which ticket).',
          'The orchestration layer selects a tool — a catalog update or a Jira action — and calls it with validated arguments.',
          'The result is summarised back to the user.',
        ],
      },
      {
        id: 'challenges',
        title: 'Common engineering concerns',
        kind: 'context',
        list: [
          'Ambiguity: natural-language requests may be incomplete, so assistants often ask a follow-up question instead of guessing.',
          'Safe writes: LLM output should be validated against a schema before any data is changed, and sensitive changes are often confirmed by a person.',
          'Prompt engineering: clear tool descriptions and examples strongly influence how reliably the model picks the right action.',
          'Permissions: the assistant should act with the requesting user’s access rights, not broader ones.',
        ],
      },
    ],
    diagram: {
      title: 'Tool-using LLM assistant — conceptual',
      description:
        'A natural-language request reaches a FastAPI service. A LangChain orchestration layer prompts an LLM, which selects a tool: either a catalog update or a Jira workflow action. The result returns to the user.',
      conceptual: true,
      width: 760,
      height: 300,
      nodes: [
        { id: 'user', label: 'User request', sublabel: 'natural language', x: 20, y: 120 },
        { id: 'api', label: 'FastAPI service', sublabel: 'Python', x: 200, y: 120, tone: 'accent' },
        { id: 'lc', label: 'LangChain', sublabel: 'prompts & tools', x: 380, y: 120, tone: 'accent' },
        { id: 'llm', label: 'LLM', sublabel: 'intent & parameters', x: 380, y: 230 },
        { id: 'catalog', label: 'Catalog update', sublabel: 'tool', x: 560, y: 40, tone: 'store' },
        { id: 'jira', label: 'Jira workflow', sublabel: 'tool', x: 560, y: 200, tone: 'store' },
      ],
      edges: [
        { from: 'user', to: 'api' },
        { from: 'api', to: 'lc' },
        { from: 'lc', to: 'llm' },
        { from: 'lc', to: 'catalog' },
        { from: 'lc', to: 'jira' },
      ],
    },
    related: ['catalogs-web-portal', 'multi-cloud-workload-optimization'],
    reviewNotes: [
      'Employer or setting (Samsung, academic, or personal) is not stated in the resume.',
      'The LLM provider/model, deployment status, and number of users are not documented.',
      'Testing/evaluation approach and measured impact are not documented.',
    ],
  },

  {
    slug: 'multi-cloud-workload-optimization',
    title: 'Multi-Cloud Workload Distribution Optimization Platform',
    subtitle: 'Cost- and latency-aware workload placement across AWS, Azure, and GCP',
    category: 'Cloud & ML Research',
    context: 'IISc M.Tech — academic project',
    featured: false,
    summary:
      'A cloud-native platform that distributes workloads across multiple cloud providers based on resource availability, performance, latency, and infrastructure cost, exploring reinforcement learning for placement decisions.',
    problem:
      'Choosing where to run a workload across several cloud providers means balancing resource availability, performance, latency, and cost at the same time.',
    outcome:
      'Designed and developed the platform and explored reinforcement learning techniques to optimise workload placement.',
    tags: ['Python', 'AWS', 'Azure', 'GCP', 'Reinforcement Learning'],
    sections: [
      {
        id: 'overview',
        title: 'Project overview',
        kind: 'documented',
        body: [
          'I designed and developed a cloud-native platform that distributes workloads across multiple cloud providers. Placement decisions consider resource availability, performance, latency, and infrastructure cost.',
          'I also explored reinforcement learning techniques to optimise those placement decisions. This was an academic project during my M.Tech at the Indian Institute of Science.',
        ],
        list: ['Technology stack: Python, AWS, Azure, GCP, Reinforcement Learning'],
      },
      {
        id: 'problem',
        title: 'Why placement is hard',
        kind: 'context',
        body: [
          'Workload placement is a multi-objective problem: the cheapest region is not always the fastest, available capacity changes over time, and latency depends on where users and data are. Static rules tend to be either too conservative or out of date.',
        ],
      },
      {
        id: 'architecture',
        title: 'Conceptual architecture',
        kind: 'context',
        diagram: true,
        body: [
          'The diagram shows the general shape of a placement system with a learning loop. It illustrates the approach explored, not a verified production design.',
        ],
      },
      {
        id: 'rl',
        title: 'Framing placement as reinforcement learning',
        kind: 'context',
        list: [
          'State: signals such as available resources, observed latency, and current prices for each provider.',
          'Action: choosing the provider (and possibly region) for an incoming workload.',
          'Reward: a weighted score that rewards performance and penalises latency and cost.',
          'Policy: the learned mapping from state to action, improved from observed rewards over time.',
        ],
      },
      {
        id: 'tradeoffs',
        title: 'Trade-offs',
        kind: 'context',
        list: [
          'Heuristics are predictable and explainable; RL can adapt to changing conditions but needs training data and careful evaluation.',
          'Exploration (trying non-optimal placements to learn) has real cost on live infrastructure, so it is usually done in simulation first.',
          'Reward weights encode business priorities, so choosing them is a product decision as much as a technical one.',
        ],
      },
    ],
    diagram: {
      title: 'Multi-cloud placement with a learning loop — conceptual',
      description:
        'Workload requests go to a placement engine. Telemetry on availability, latency, and cost from AWS, Azure, and GCP informs a reinforcement learning policy, which chooses the provider. Observed outcomes feed back as reward.',
      conceptual: true,
      width: 760,
      height: 300,
      nodes: [
        { id: 'req', label: 'Workload request', x: 20, y: 120 },
        { id: 'engine', label: 'Placement engine', sublabel: 'Python', x: 200, y: 120, tone: 'accent' },
        { id: 'policy', label: 'RL policy', sublabel: 'state → action', x: 200, y: 230, tone: 'accent' },
        { id: 'telemetry', label: 'Telemetry', sublabel: 'availability · latency · cost', x: 200, y: 10 },
        { id: 'aws', label: 'AWS', x: 560, y: 20, tone: 'store' },
        { id: 'azure', label: 'Azure', x: 560, y: 120, tone: 'store' },
        { id: 'gcp', label: 'GCP', x: 560, y: 220, tone: 'store' },
      ],
      edges: [
        { from: 'req', to: 'engine' },
        { from: 'telemetry', to: 'engine' },
        { from: 'engine', to: 'policy', label: 'decide' },
        { from: 'engine', to: 'aws' },
        { from: 'engine', to: 'azure', label: 'deploy' },
        { from: 'engine', to: 'gcp' },
      ],
    },
    related: ['cassandra-to-dynamodb-migration', 'ai-catalog-assistant'],
    reviewNotes: [
      'Specific RL algorithms, simulation setup, and evaluation results are not documented.',
      'Whether RL was adopted in the final platform or remained exploratory is not stated (resume says "explored").',
    ],
  },
]

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug) ?? null
}

export function getAdjacentProjects(slug) {
  const index = projects.findIndex((project) => project.slug === slug)
  if (index === -1) return { previous: null, next: null }
  return {
    previous: projects[index - 1] ?? null,
    next: projects[index + 1] ?? null,
  }
}

export function getRelatedProjects(project) {
  return (project.related ?? []).map(getProjectBySlug).filter(Boolean)
}

export const projectCategories = [...new Set(projects.map((project) => project.category))]
