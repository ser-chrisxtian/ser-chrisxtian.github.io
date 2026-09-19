import { projects } from './projects';
import { profile } from './profile';
import { isPlaceholder } from '../shared/placeholder';

// Guards against common mistakes when editing the content files.
describe('portfolio data', () => {
  it('uses unique, URL-safe project ids', () => {
    const ids = projects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it('uses relative image paths so they resolve against the base href', () => {
    const images = projects.flatMap((p) => [p.image, ...(p.screenshots ?? [])]);
    for (const image of images) {
      expect(image.src.startsWith('/')).toBe(false);
      expect(image.alt.trim().length).toBeGreaterThan(0);
    }
    expect(profile.resumePath.startsWith('/')).toBe(false);
  });

  it('only uses real (non-placeholder) project links', () => {
    for (const project of projects) {
      for (const url of [project.githubUrl, project.demoUrl]) {
        if (url !== undefined) expect(url).toMatch(/^https:\/\//);
      }
    }
  });
});

describe('isPlaceholder', () => {
  it('detects bracketed placeholder values', () => {
    expect(isPlaceholder('[Add Email]')).toBe(true);
    expect(isPlaceholder('  [Add LinkedIn URL] ')).toBe(true);
    expect(isPlaceholder('')).toBe(true);
    expect(isPlaceholder('https://github.com/ser-chrisxtian')).toBe(false);
  });
});
