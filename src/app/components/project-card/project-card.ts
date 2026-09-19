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
      class="group relative flex h-full flex-col text-center"
      [attr.aria-labelledby]="'project-' + p.id"
    >
      <!-- Beige tile holding the project image -->
      <div
        class="relative overflow-hidden rounded-[2rem] bg-tile p-5 transition-[transform,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:shadow-card group-has-[h3_a:focus-visible]:ring-2 group-has-[h3_a:focus-visible]:ring-accent sm:p-7"
      >
        <img
          [src]="p.image.src"
          [alt]="p.image.alt"
          width="1600"
          height="1000"
          loading="lazy"
          decoding="async"
          class="aspect-[16/10] w-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-[1.02] dark:brightness-[0.85]"
        />
        @if (p.featured) {
          <span
            class="absolute top-4 right-4 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-ink"
          >
            Featured
          </span>
        }
      </div>

      <p class="mt-6 text-sm text-accent-text">{{ p.category }}</p>
      <h3 [id]="'project-' + p.id" class="mt-1 text-2xl font-medium text-ink">
        <!-- Stretched link: the whole card opens the project; other controls sit above it. -->
        <a
          [routerLink]="['/projects', p.id]"
          class="after:absolute after:inset-0 focus-visible:outline-none"
        >
          {{ p.title }}
        </a>
      </h3>
      <p class="mx-auto mt-3 max-w-md leading-relaxed text-muted">{{ p.description }}</p>

      <ul class="mt-5 flex flex-wrap justify-center gap-1.5" aria-label="Technologies">
        @for (tech of visibleTech(); track tech) {
          <li class="chip">{{ tech }}</li>
        }
        @if (hiddenTechCount() > 0) {
          <li class="chip text-muted">+{{ hiddenTechCount() }}</li>
        }
      </ul>

      <div class="relative mt-auto flex flex-wrap items-center justify-center gap-2 pt-6">
        <a
          [routerLink]="['/projects', p.id]"
          class="btn btn-secondary min-h-11"
          tabindex="-1"
          aria-hidden="true"
        >
          View project
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
            class="btn btn-ghost min-h-11"
            [attr.aria-label]="p.title + ' on GitHub (opens in a new tab)'"
          >
            <svg appIcon="github" class="size-4"></svg>
            GitHub
          </a>
        } @else {
          <span class="inline-flex items-center gap-1.5 px-2 text-sm text-muted">
            <svg appIcon="lock" class="size-3.5"></svg>
            Private Project
          </span>
        }
        @if (p.demoUrl) {
          <a
            [href]="p.demoUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-ghost min-h-11"
            [attr.aria-label]="p.title + ' live demo (opens in a new tab)'"
          >
            <svg appIcon="external-link" class="size-4"></svg>
            Live Demo
          </a>
        }
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
