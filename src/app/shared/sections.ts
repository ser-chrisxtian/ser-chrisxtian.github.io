import { Injectable, signal } from '@angular/core';

export interface PageSection {
  id: string;
  label: string;
}

/** Home page sections, in page order. Drives the navbar and the scroll spy. */
export const PAGE_SECTIONS: readonly PageSection[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

/** Holds the section currently in view on the home page (null on other pages). */
@Injectable({ providedIn: 'root' })
export class ActiveSectionService {
  readonly active = signal<string | null>(null);

  /** Observes the home page sections; returns a cleanup function. */
  observe(root: Document): () => void {
    const elements = PAGE_SECTIONS.map((section) => root.getElementById(section.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (typeof IntersectionObserver === 'undefined' || elements.length === 0) {
      return () => this.active.set(null);
    }

    // A section is "active" while it crosses a thin band just above the middle of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) this.active.set(entry.target.id);
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    elements.forEach((el) => observer.observe(el));

    // The last section can be too short to reach the band, so mark it active at the page bottom.
    const view = root.defaultView;
    const onScroll = () => {
      if (view && view.innerHeight + view.scrollY >= root.documentElement.scrollHeight - 4) {
        this.active.set(elements[elements.length - 1].id);
      }
    };
    view?.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      view?.removeEventListener('scroll', onScroll);
      this.active.set(null);
    };
  }
}
