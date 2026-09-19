/**
 * Professional experience, shown as a timeline (listed top to bottom).
 *
 * Values written as `[Add …]` are placeholders — replace them with the actual
 * organization, role, and period. Add entries by appending objects to the array.
 */

export interface Experience {
  organization: string;
  role: string;
  period: string;
  description: string;
  /** Optional bullet points: responsibilities, subjects taught, systems built. */
  highlightsLabel?: string;
  highlights?: string[];
  technologies?: string[];
  type: 'education' | 'development';
}

export const experience: Experience[] = [
  {
    organization: '[Add Organization]',
    role: 'IT Educator',
    period: '[Add Employment Period]',
    description:
      'Teaches information technology courses, covering programming fundamentals, web technologies, databases, and software development practices.',
    highlightsLabel: 'Teaching areas',
    highlights: [
      'Web Development',
      'Web Application Development',
      'Web Security',
      'Programming',
      'Mobile Application Development',
      'Database Systems',
      'Software Development',
    ],
    type: 'education',
  },
  {
    organization: '[Add Organization]',
    role: 'Software Developer',
    period: '[Add Employment Period]',
    description:
      'Develops practical software and information systems, including web applications that support academic and administrative processes such as scheduling and document monitoring.',
    technologies: ['Angular', 'TypeScript', 'NestJS', 'PostgreSQL', 'Prisma'],
    type: 'development',
  },
];
