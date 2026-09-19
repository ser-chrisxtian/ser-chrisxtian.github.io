/**
 * Education and credentials.
 *
 * Replace `[Add …]` placeholders with real details. Add further degrees,
 * certifications, or trainings by appending entries to the array.
 */

export interface Education {
  credential: string;
  institution: string;
  period: string;
  details?: string;
}

export const education: Education[] = [
  {
    credential: 'Bachelor of Science in Information Technology',
    institution: '[Add School]',
    period: '[Add Year Completed]',
  },
];
