// Records whether public/resume.pdf exists (runs automatically before `npm start` / `npm run build`).
// The app reads public/resume-status.json to decide whether to show the Resume download button,
// so a missing resume never produces a broken link or a 404 request in the browser.
import { existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const publicDir = join(import.meta.dirname, '..', 'public');
const available = existsSync(join(publicDir, 'resume.pdf'));

writeFileSync(join(publicDir, 'resume-status.json'), JSON.stringify({ available }) + '\n');
console.log(
  `resume-status: resume.pdf ${available ? 'found' : 'not found — Resume button shows "in preparation"'}`,
);
