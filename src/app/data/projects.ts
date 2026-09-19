/**
 * Portfolio projects.
 *
 * To add a project, append an object to `projects` below. The home page cards,
 * category filter, and `/projects/:id` detail page are all generated from this list.
 *
 * Images live in `public/images/projects/<project-id>/`. Paths here are relative
 * (no leading slash) so they resolve correctly against the site's base href.
 */

export type ProjectCategory =
  | 'Web Application'
  | 'Information System'
  | 'Mobile Application'
  | 'Education Technology'
  | 'Other';

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
  /** True while the image is a generated placeholder rather than a real screenshot. */
  placeholder?: boolean;
}

export interface Project {
  /** URL slug: /projects/<id>. Use lowercase words separated by hyphens. */
  id: string;
  title: string;
  /** One or two sentences shown on the project card. */
  description: string;
  /** Overview paragraph on the detail page. */
  longDescription?: string;
  category: ProjectCategory;
  technologies: string[];
  /** Card / cover image. */
  image: ProjectImage;
  problem?: string;
  solution?: string;
  /** Heading used for the feature list, e.g. "Key features" or "Modules". */
  featuresLabel?: string;
  features?: string[];
  role?: string;
  screenshots?: ProjectImage[];
  /** Only set when the repository is public. Leave undefined for private projects. */
  githubUrl?: string;
  /** Only set when a live deployment exists. */
  demoUrl?: string;
  status?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 'neust-portal',
    title: 'NEUST Portal',
    description:
      'A campus information and management platform designed to support academic and administrative processes.',
    longDescription:
      'NEUST Portal is a campus platform that brings academic and administrative processes into a single web application. It is organized into modules — such as scheduling, payroll, document monitoring, records management, office orders, and reports — that share a common data model and user interface.',
    category: 'Web Application',
    technologies: ['Angular', 'TypeScript', 'NestJS', 'PostgreSQL', 'Prisma', 'PrimeNG'],
    image: {
      src: 'images/projects/neust-portal/cover.svg',
      alt: 'Placeholder illustration of the NEUST Portal dashboard layout',
      placeholder: true,
    },
    problem:
      'Academic and administrative processes are often handled through separate spreadsheets, paper forms, and disconnected tools, which makes information harder to find, reconcile, and report on.',
    solution:
      'A modular web platform with a shared database and consistent interface, so related processes can be managed in one place and reports can draw from the same source of data.',
    featuresLabel: 'Modules',
    features: [
      'Scheduling',
      'Payroll',
      'Document monitoring',
      'Records management',
      'Office orders',
      'Reports',
    ],
    role: '[Add your role on this project]',
    screenshots: [
      {
        src: 'images/projects/neust-portal/cover.svg',
        alt: 'Placeholder illustration of the NEUST Portal dashboard layout',
        caption: '[Add Project Screenshot]',
        placeholder: true,
      },
    ],
    featured: true,
  },
  {
    id: 'scheduling-system',
    title: 'Scheduling System',
    description:
      'A scheduling system for managing academic schedules across classrooms, faculty, sections, and students.',
    longDescription:
      'The Scheduling System manages academic timetables by relating classrooms, faculty members, sections, and students. It is designed to help schedulers build timetables, detect conflicts, and produce schedule reports.',
    category: 'Education Technology',
    technologies: ['Angular', 'TypeScript', 'NestJS', 'PostgreSQL', 'Prisma'],
    image: {
      src: 'images/projects/scheduling-system/cover.svg',
      alt: 'Placeholder illustration of a weekly timetable grid',
      placeholder: true,
    },
    problem:
      'Academic scheduling involves many constraints at once — room availability, faculty loads, and section timetables — and conflicts are easy to miss when schedules are prepared manually.',
    solution:
      'A system that stores schedules in a relational database and checks new entries against existing faculty, classroom, and section assignments to surface conflicts early.',
    featuresLabel: 'Key features',
    features: [
      'Faculty scheduling',
      'Classroom scheduling',
      'Section scheduling',
      'Conflict detection',
      'Timetable management',
      'Reports',
    ],
    role: '[Add your role on this project]',
    screenshots: [
      {
        src: 'images/projects/scheduling-system/cover.svg',
        alt: 'Placeholder illustration of a weekly timetable grid',
        caption: '[Add Project Screenshot]',
        placeholder: true,
      },
    ],
    featured: true,
  },
  {
    id: 'document-monitoring',
    title: 'Document Monitoring System',
    description: 'An information system for monitoring documents as they move between offices.',
    longDescription:
      'The Document Monitoring System records documents as they are registered and routed between offices, keeping track of who is handling each document, its current status, and its full movement history.',
    category: 'Information System',
    technologies: ['Angular', 'NestJS', 'PostgreSQL', 'Prisma'],
    image: {
      src: 'images/projects/document-monitoring/cover.svg',
      alt: 'Placeholder illustration of a document routing timeline between offices',
      placeholder: true,
    },
    problem:
      'When documents move between offices on paper, it can be difficult to know where a document currently is, who is holding it, and whether it is overdue.',
    solution:
      'A central registry where each document is logged, checked out and in as it moves between offices, and monitored through its status and history.',
    featuresLabel: 'Key features',
    features: [
      'Document registration',
      'Office tracking',
      'Personnel handling',
      'File check-out / check-in',
      'Document history',
      'Status monitoring',
      'Supporting documents',
      'Overdue monitoring',
    ],
    role: '[Add your role on this project]',
    screenshots: [
      {
        src: 'images/projects/document-monitoring/cover.svg',
        alt: 'Placeholder illustration of a document routing timeline between offices',
        caption: '[Add Project Screenshot]',
        placeholder: true,
      },
    ],
  },
  {
    id: 'safelink',
    title: 'SafeLink',
    description:
      'A mobile safety application that lets users configure emergency contacts and trigger alerts containing location information.',
    longDescription:
      'SafeLink is a mobile safety application. Users set up a list of emergency contacts in advance, and can then trigger an alert that shares their location information with those contacts.',
    category: 'Mobile Application',
    technologies: ['Ionic', 'Angular', 'Android', 'SQLite'],
    image: {
      src: 'images/projects/safelink/cover.svg',
      alt: 'Placeholder illustration of a mobile phone showing an emergency alert screen',
      placeholder: true,
    },
    featuresLabel: 'Key features',
    features: [
      'Emergency contact configuration',
      'Alert triggering',
      'Location information in alerts',
    ],
    role: '[Add your role on this project]',
    screenshots: [
      {
        src: 'images/projects/safelink/cover.svg',
        alt: 'Placeholder illustration of a mobile phone showing an emergency alert screen',
        caption: '[Add Project Screenshot]',
        placeholder: true,
      },
    ],
  },
];

export function findProject(id: string | null | undefined): Project | undefined {
  return projects.find((project) => project.id === id);
}
