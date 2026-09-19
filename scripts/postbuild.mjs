// Prepares the production build for GitHub Pages (runs automatically after `npm run build`).
//
// - 404.html: GitHub Pages serves this file for any unknown path. Making it a copy of
//   index.html lets Angular's router handle deep links such as /projects/safelink
//   when they are opened directly or refreshed.
// - .nojekyll: tells GitHub Pages to serve the files as-is, without Jekyll processing.
import { copyFileSync, existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const outDir = join(import.meta.dirname, '..', 'dist', 'portfolio', 'browser');
const index = join(outDir, 'index.html');

if (!existsSync(index)) {
  console.error(`postbuild: ${index} not found — did the Angular build succeed?`);
  process.exit(1);
}

copyFileSync(index, join(outDir, '404.html'));
writeFileSync(join(outDir, '.nojekyll'), '');
console.log('postbuild: added 404.html (SPA fallback) and .nojekyll');
