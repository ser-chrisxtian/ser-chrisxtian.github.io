import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../icon/icon';
import { Project } from '../../data/projects';

const MAX_VISIBLE_TECH = 4;

@Component({
  selector: 'app-project-card',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block h-full' },
  template: `
    @let p = project();
    <article
      class="card group relative flex h-full flex-col overflow-hidden transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong has-[h3_a:focus-visible]:ring-2 has-[h3_a:focus-visible]:ring-accent"
      [attr.aria-labelledby]="'project-' + p.id"
    >
      <div class="relative aspect-[16/10] overflow-hidden border-b border-line bg-surface-2">
        <img
          [src]="p.image.src"
          [alt]="p.image.alt"
          width="1600"
          height="1000"
          loading="lazy"
          decoding="async"
          class="size-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <div class="absolute top-3 left-3 flex gap-2">
          <span
            class="rounded-md border border-white/10 bg-black/55 px-2 py-1 font-mono text-[11px] text-white backdrop-blur"
          >
            {{ p.category }}
          </span>
          @if (p.featured) {
            <span
              class="rounded-md bg-accent px-2 py-1 font-mono text-[11px] font-medium text-accent-ink"
            >
              Featured
            </span>
          }
        </div>
      </div>

      <div class="flex flex-1 flex-col p-6">
        <h3 [id]="'project-' + p.id" class="text-lg font-semibold tracking-tight text-ink">
          <!-- Stretched link: the whole card opens the project, other controls sit above it. -->
          <a
            [routerLink]="['/projects', p.id]"
            class="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {{ p.title }}
          </a>
        </h3>
        <p class="mt-2 text-sm leading-relaxed text-muted">{{ p.description }}</p>

        <ul class="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
          @for (tech of visibleTech(); track tech) {
            <li class="chip">{{ tech }}</li>
          }
          @if (hiddenTechCount() > 0) {
            <li class="chip text-muted">+{{ hiddenTechCount() }}</li>
          }
        </ul>

        <div class="relative mt-auto flex flex-wrap items-center gap-2 pt-6">
          <a
            [routerLink]="['/projects', p.id]"
            class="btn btn-secondary"
            tabindex="-1"
            aria-hidden="true"
          >
            View Project
            <svg
              appIcon="arrow-right"
              class="size-4 transition-transform group-hover:translate-x-0.5"
            ></svg>
          </a>
          @if (p.githubUrl) {
            <a
              [href]="p.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-ghost"
              [attr.aria-label]="p.title + ' on GitHub (opens in a new tab)'"
            >
              <svg appIcon="github" class="size-4"></svg>
              GitHub
            </a>
          } @else {
            <span class="inline-flex items-center gap-1.5 px-2 font-mono text-xs text-muted">
              <svg appIcon="lock" class="size-3.5"></svg>
              Private Project
            </span>
          }
          @if (p.demoUrl) {
            <a
              [href]="p.demoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-ghost"
              [attr.aria-label]="p.title + ' live demo (opens in a new tab)'"
            >
              <svg appIcon="external-link" class="size-4"></svg>
              Live Demo
            </a>
          }
        </div>
      </div>
    </article>
  `,
})
export class ProjectCard {
  readonly project = input.required<Project>();

  protected readonly visibleTech = computed(() =>
    this.project().technologies.slice(0, MAX_VISIBLE_TECH),
  );
  protected readonly hiddenTechCount = computed(
    () => this.project().technologies.length - MAX_VISIBLE_TECH,
  );
}
