import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { ThemeService } from './shared/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      href="#main"
      class="sr-only z-[60] rounded-lg bg-ink px-4 py-2 text-sm text-canvas focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      (click)="skipToMain($event)"
    >
      Skip to content
    </a>
    <app-navbar />
    <main id="main" tabindex="-1" class="outline-none">
      <router-outlet />
    </main>
    <app-footer />
  `,
})
export class App {
  constructor() {
    // Instantiate early so the saved / system theme is applied on startup.
    inject(ThemeService);
  }

  /** Plain "#main" would be resolved against the base href and reload the page. */
  protected skipToMain(event: Event): void {
    event.preventDefault();
    document.getElementById('main')?.focus();
  }
}
