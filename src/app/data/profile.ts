/**
 * Personal information shown across the site.
 *
 * Any value written as `[Something]` is treated as a placeholder: the UI renders it
 * as a clearly marked "to be added" label and never turns it into a link.
 * Replace the bracketed text with real information when it is available.
 */

import type { IconName } from '../components/icon/icons';

export interface SocialLink {
  label: string;
  url: string;
  icon: 'github' | 'linkedin' | 'mail' | 'link';
}

export interface Pillar {
  title: string;
  description: string;
  icon: IconName;
}

export interface Profile {
  name: string;
  initials: string;
  roles: string[];
  headline: string;
  summary: string;
  bio: string[];
  /** Areas of work listed in the About section. */
  interests: string[];
  /** The "What I Do" cards in the About section. */
  pillars: Pillar[];
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  /** Additional professional links (portfolio, publications, ORCID, etc.). */
  otherLinks: SocialLink[];
  /**
   * Optional portrait for the hero section, e.g. `images/profile.jpg` in `public/`.
   * Leave undefined to show the illustrated workspace instead.
   */
  photo?: { src: string; alt: string };
  /** Path relative to the site root. The file itself lives in `public/`. */
  resumePath: string;
  siteUrl: string;
  /** Short lists used by the code-style card in the hero section. */
  focusAreas: string[];
  teachingAreas: string[];
}

export const profile: Profile = {
  name: 'Christian B. Peña',
  initials: 'CP',
  roles: ['IT Educator', 'Software Developer', 'Web Developer'],
  headline: 'I build practical software and teach technology.',
  summary:
    'I develop web applications and information systems, and I teach information technology — with a focus on web development, database-driven systems, and using technology to solve real problems.',
  bio: [
    'My work sits where software development and education meet. On the development side, I design and build web applications and information systems — the kind that support everyday academic and administrative work such as scheduling, document tracking, and records management.',
    'As an IT educator, I teach programming, web technologies, and core information technology concepts. Teaching keeps my own practice grounded: explaining how a system works to someone else is a good test of whether it was built clearly.',
    'I am most interested in practical, maintainable solutions — well-structured databases, clean APIs, and interfaces people can actually use — and I keep exploring new tools and development practices along the way.',
  ],
  interests: [
    'Software development',
    'Web development',
    'Web application development',
    'Information systems',
    'Database-driven applications',
    'IT education',
    'Technology training',
    'Practical digital solutions',
  ],
  pillars: [
    {
      title: 'Build',
      description: 'Practical web applications and information systems.',
      icon: 'layers',
    },
    {
      title: 'Teach',
      description: 'Programming, web technologies, and information technology concepts.',
      icon: 'presentation',
    },
    {
      title: 'Solve',
      description: 'Use technology to improve workflows and address real-world problems.',
      icon: 'lightbulb',
    },
    {
      title: 'Learn',
      description: 'Continuously explore new technologies and development practices.',
      icon: 'compass',
    },
  ],
  email: 'ser.chrisxtian@gmail.com',
  githubUrl: 'https://github.com/ser-chrisxtian',
  linkedinUrl: '[Add LinkedIn URL]',
  otherLinks: [{ label: '[Add Other Professional Link]', url: '[Add URL]', icon: 'link' }],
  resumePath: 'resume.pdf',
  siteUrl: 'https://ser-chrisxtian.github.io/',
  focusAreas: ['web applications', 'information systems', 'databases & APIs'],
  teachingAreas: ['programming', 'web development', 'database systems'],
};
