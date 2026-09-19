import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icon } from '../../components/icon/icon';
import { SectionHeading } from '../../components/section-heading/section-heading';
import { TechBadge } from '../../components/tech-badge/tech-badge';
import { Reveal } from '../../shared/reveal.directive';
import { skillCategories } from '../../data/skills';
import { projects } from '../../data/projects';

/** Maps each technology name to the titles of projects that use it. */
function buildUsageIndex(): Map<string, string[]> {
  const index = new Map<string, string[]>();
  for (const project of projects) {
    for (const tech of project.technologies) {
      index.set(tech, [...(index.get(tech) ?? []), project.title]);
    }
  }
  return index;
}

@Component({
  selector: 'app-skills',
  imports: [Icon, SectionHeading, TechBadge, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      id="skills"
      class="scroll-mt-16 border-t border-line py-24 sm:py-32"
      aria-labelledby="skills-title"
    >
      <div class="container-page">
        <app-section-heading
          index="02"
          eyebrow="Skills"
          headingId="skills-title"
          title="Technology stack"
          description="The languages, frameworks, and tools I work with, grouped by where they sit in a system."
        />

        <div class="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          @for (category of categories; track category.id; let i = $index) {
            <article
              appReveal
              [revealDelay]="(i % 3) * 80"
              class="card flex flex-col p-6"
              [attr.aria-labelledby]="'skill-' + category.id"
            >
              <div class="flex items-center gap-3">
                <span
                  class="grid size-9 place-items-center rounded-lg border border-line bg-surface-2 text-accent"
                >
                  <svg [appIcon]="category.icon" class="size-[18px]"></svg>
                </span>
                <h3 [id]="'skill-' + category.id" class="text-base font-semibold text-ink">
                  {{ category.title }}
                </h3>
              </div>
              <p class="mt-3 text-sm leading-relaxed text-muted">{{ category.description }}</p>
              <ul class="mt-5 flex flex-wrap gap-2">
                @for (item of category.items; track item) {
                  <li><app-tech-badge [name]="item" [usedIn]="usage.get(item) ?? []" /></li>
                }
              </ul>
            </article>
          }

          <!-- Legend: explains the markers instead of using proficiency percentages. -->
          <aside
            appReveal
            [revealDelay]="160"
            class="flex flex-col justify-between rounded-2xl border border-dashed border-line-strong p-6"
          >
            <div>
              <p class="font-mono text-xs tracking-[0.14em] text-muted uppercase">
                Reading this section
              </p>
              <p class="mt-3 text-sm leading-relaxed text-ink-soft">
                Technologies marked with
                <span
                  class="mx-0.5 inline-block size-1.5 -translate-y-px rounded-full bg-accent align-middle"
                ></span>
                are used in the projects below — hover over a label to see which ones.
              </p>
            </div>
            <p class="mt-6 font-mono text-xs text-muted">
              No proficiency percentages — the projects show how each tool is applied.
            </p>
          </aside>
        </div>
      </div>
    </section>
  `,
})
export class Skills {
  protected readonly categories = skillCategories;
  protected readonly usage = buildUsageIndex();
}
