import { DOCUMENT, Injectable, effect, inject, signal } from '@angular/core';

export type Theme = 'dark' | 'light';

/** Must match the key used by the inline script in index.html (prevents a theme flash). */
const STORAGE_KEY = 'theme';
const THEME_COLORS: Record<Theme, string> = { dark: '#0a0c10', light: '#f7f7f5' };

/**
 * Theme preference: saved choice → operating-system preference → dark.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly lightQuery = this.document.defaultView?.matchMedia?.(
    '(prefers-color-scheme: light)',
  );

  readonly theme = signal<Theme>(this.readSaved() ?? this.systemTheme());

  constructor() {
    effect(() => {
      const theme = this.theme();
      const root = this.document.documentElement;
      root.classList.toggle('dark', theme === 'dark');
      this.document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', THEME_COLORS[theme]);
    });

    // Follow OS changes until the visitor makes an explicit choice.
    this.lightQuery?.addEventListener('change', () => {
      if (!this.readSaved()) this.theme.set(this.systemTheme());
    });
  }

  toggle(): void {
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable (private mode); the choice still applies for this visit.
    }
  }

  private readSaved(): Theme | null {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved === 'dark' || saved === 'light' ? saved : null;
    } catch {
      return null;
    }
  }

  private systemTheme(): Theme {
    return this.lightQuery?.matches ? 'light' : 'dark';
  }
}
