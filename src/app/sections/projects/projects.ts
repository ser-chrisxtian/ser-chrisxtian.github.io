import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { SectionHeading } from '../../components/section-heading/section-heading';
import { ProjectCard } from '../../components/project-card/project-card';
import { Reveal } from '../../shared/reveal.directive';
import { ProjectCategory, projects } from '../../data/projects';

type Filter = ProjectCategory | 'All';

@Component({
  selector: 'app-projects',
  imports: [SectionHeading, ProjectCard, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      id="projects"
      class="scroll-mt-20 bg-canvas-alt py-24 sm:py-28"
      aria-labelledby="projects-title"
    >
      <div class="container-page">
        <app-section-heading
          headingId="projects-title"
          title="Featured Projects"
          description="Information systems and applications built around real academic, administrative, and safety needs."
        />

        @if (filters.length > 2) {
          <div
            appReveal
            class="mt-8 flex max-w-full gap-2 overflow-x-auto pb-1 [scrollbar-width:none] sm:flex-wrap"
            role="group"
            aria-label="Filter projects by category"
          >
            @for (filter of filters; track filter) {
              <button
                type="button"
                class="min-h-10 shrink-0 rounded-full px-4 text-[15px] whitespace-nowrap transition-colors duration-200"
                [class]="
                  active() === filter
                    ? 'bg-accent text-accent-ink'
                    : 'bg-tile text-ink-soft hover:bg-tile-strong hover:text-ink'
                "
                [attr.aria-pressed]="active() === filter"
                (click)="active.set(filter)"
              >
                {{ filter }}
                <span class="ml-1 text-sm opacity-70">{{ countFor(filter) }}</span>
              </button>
            }
          </div>
        }

        <p class="sr-only" aria-live="polite">{{ visible().length }} projects shown</p>

        <ul class="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-2">
          @for (project of visible(); track project.id; let i = $index) {
            <li animate.enter="card-enter" [style.animation-delay.ms]="i * 60">
              <app-project-card [project]="project" />
            </li>
          }
        </ul>
      </div>
    </section>
  `,
})
export class Projects {
  /** Only categories that actually have projects become filter buttons. */
  protected readonly filters: Filter[] = ['All', ...new Set(projects.map((p) => p.category))];
  protected readonly active = signal<Filter>('All');

  protected readonly visible = computed(() => {
    const filter = this.active();
    return filter === 'All' ? projects : projects.filter((p) => p.category === filter);
  });

  protected countFor(filter: Filter): number {
    return filter === 'All'
      ? projects.length
      : projects.filter((p) => p.category === filter).length;
  }
}
