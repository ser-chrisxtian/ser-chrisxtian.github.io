import { Injectable, signal } from '@angular/core';
import { profile } from '../data/profile';

export type ResumeState = 'checking' | 'available' | 'unavailable';

/**
 * Shows the resume download only when the PDF has actually been published.
 *
 * `scripts/resume-status.mjs` runs before every `npm start` / `npm run build` and writes
 * `resume-status.json` recording whether `public/resume.pdf` exists. Reading that file
 * (instead of probing the PDF) avoids broken links and 404 requests.
 */
@Injectable({ providedIn: 'root' })
export class ResumeService {
  readonly href = profile.resumePath;
  readonly state = signal<ResumeState>('checking');

  constructor() {
    void this.check();
  }

  private async check(): Promise<void> {
    try {
      const response = await fetch('resume-status.json', { cache: 'no-cache' });
      const status: { available?: unknown } = await response.json();
      this.state.set(status.available === true ? 'available' : 'unavailable');
    } catch {
      this.state.set('unavailable');
    }
  }
}
