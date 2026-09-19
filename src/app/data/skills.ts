/**
 * Technology stack, grouped by category.
 *
 * Add or remove a technology by editing the `items` array of a category.
 * Technology names that also appear in a project's `technologies` list are
 * automatically linked to that project in the Skills section, so keep the
 * spelling consistent with `projects.ts`.
 */

import type { IconName } from '../components/icon/icons';

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'programming',
    title: 'Programming',
    description: 'Languages used for application logic, scripting, and data work.',
    icon: 'code',
    items: ['JavaScript', 'TypeScript', 'PHP', 'Python', 'Java', 'SQL'],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    description: 'Building responsive web and mobile interfaces.',
    icon: 'layout',
    items: ['Angular', 'Ionic', 'HTML', 'CSS', 'Tailwind CSS', 'PrimeNG'],
  },
  {
    id: 'backend',
    title: 'Backend',
    description: 'APIs and server-side application frameworks.',
    icon: 'server',
    items: ['NestJS', 'Spring Boot', 'Flask'],
  },
  {
    id: 'database',
    title: 'Database',
    description: 'Relational data modeling, queries, and ORMs.',
    icon: 'database',
    items: ['PostgreSQL', 'MySQL', 'SQLite', 'Prisma'],
  },
  {
    id: 'tools',
    title: 'Tools',
    description: 'Version control, environments, and everyday tooling.',
    icon: 'wrench',
    items: ['Git', 'GitHub', 'Docker', 'VS Code'],
  },
];
