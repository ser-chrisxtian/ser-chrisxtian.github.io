import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../icon/icon';
import { profile } from '../../data/profile';
import { isPlaceholder } from '../../shared/placeholder';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="border-t border-line">
      <div
        class="container-page flex flex-col gap-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between"
      >
        <div class="space-y-1.5">
          <p class="font-medium text-ink">{{ profile.name }}</p>
          <p>{{ profile.roles.join(' · ') }}</p>
          <p class="font-mono text-xs">
            © {{ year }} · Built with Angular &amp; Tailwind CSS · Hosted on GitHub Pages
          </p>
        </div>

        <div class="flex items-center gap-1">
          @if (links.github) {
            <a
              [href]="profile.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="grid size-10 place-items-center rounded-lg transition-colors hover:bg-surface-2 hover:text-ink"
              aria-label="GitHub (opens in a new tab)"
            >
              <svg appIcon="github" class="size-[18px]"></svg>
            </a>
          }
          @if (links.linkedin) {
            <a
              [href]="profile.linkedinUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="grid size-10 place-items-center rounded-lg transition-colors hover:bg-surface-2 hover:text-ink"
              aria-label="LinkedIn (opens in a new tab)"
            >
              <svg appIcon="linkedin" class="size-[18px]"></svg>
            </a>
          }
          @if (links.email) {
            <a
              [href]="'mailto:' + profile.email"
              class="grid size-10 place-items-center rounded-lg transition-colors hover:bg-surface-2 hover:text-ink"
              aria-label="Send an email"
            >
              <svg appIcon="mail" class="size-[18px]"></svg>
            </a>
          }
          <a
            routerLink="/"
            fragment="home"
            class="ml-2 inline-flex min-h-10 items-center gap-2 rounded-lg border border-line px-3 transition-colors hover:border-line-strong hover:text-ink"
          >
            <svg appIcon="arrow-up" class="size-4"></svg>
            Back to top
          </a>
        </div>
      </div>
    </footer>
  `,
})
export class Footer {
  protected readonly profile = profile;
  protected readonly year = new Date().getFullYear();
  protected readonly links = {
    github: !isPlaceholder(profile.githubUrl),
    linkedin: !isPlaceholder(profile.linkedinUrl),
    email: !isPlaceholder(profile.email),
  };
}
