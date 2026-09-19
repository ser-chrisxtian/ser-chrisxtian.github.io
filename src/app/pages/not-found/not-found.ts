import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../components/icon/icon';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-enter">
      <div class="container-page flex min-h-[70vh] flex-col items-start justify-center py-24">
        <p class="font-display text-7xl font-medium text-accent-text">404</p>
        <h1 class="mt-4 text-4xl font-medium tracking-tight text-ink sm:text-5xl">
          {{ heading() ?? 'Page not found' }}
        </h1>
        <p class="mt-4 max-w-md text-lg text-muted">{{ message() ?? defaultMessage }}</p>
        <div class="mt-8 flex flex-wrap gap-3">
          <a routerLink="/" class="btn btn-primary">
            <svg appIcon="arrow-left" class="size-4"></svg>
            Back to home
          </a>
          <a routerLink="/" fragment="projects" class="btn btn-secondary">View projects</a>
        </div>
      </div>
    </section>
  `,
})
export class NotFound {
  // Optional overrides. No defaults here: route input binding resets unmatched inputs to undefined.
  readonly heading = input<string>();
  readonly message = input<string>();
  protected readonly defaultMessage =
    'The page you are looking for does not exist or may have been moved.';
}
