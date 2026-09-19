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
    <section id="skills" class="scroll-mt-20 py-24 sm:py-28" aria-labelledby="skills-title">
      <div class="container-page">
        <app-section-heading
          headingId="skills-title"
          title="Skills & Tools"
          description="The languages, frameworks, and tools I work with, grouped by where they sit in a system."
        />

        <div class="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          @for (category of categories; track category.id; let i = $index) {
            <article
              appReveal
              [revealDelay]="(i % 3) * 80"
              class="flex flex-col rounded-3xl bg-tile p-7"
              [attr.aria-labelledby]="'skill-' + category.id"
            >
              <div class="flex items-center gap-3">
                <span
                  class="grid size-11 place-items-center rounded-2xl bg-surface text-accent-text"
                >
                  <svg [appIcon]="category.icon" class="size-5"></svg>
                </span>
                <h3 [id]="'skill-' + category.id" class="text-xl font-medium text-ink">
                  {{ category.title }}
                </h3>
              </div>
              <p class="mt-4 text-[15px] leading-relaxed text-muted">{{ category.description }}</p>
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
            class="flex flex-col justify-center rounded-3xl border-2 border-dashed border-line-strong p-7"
          >
            <p class="font-display text-lg font-medium text-ink">Reading this section</p>
            <p class="mt-3 leading-relaxed text-muted">
              Technologies marked with
              <span
                class="mx-0.5 inline-block size-2 -translate-y-px rounded-full bg-accent align-middle"
              ></span>
              are used in the projects below — hover over a label to see which ones. No proficiency
              percentages: the projects show how each tool is applied.
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
