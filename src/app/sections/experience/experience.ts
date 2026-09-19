import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icon } from '../../components/icon/icon';
import { SectionHeading } from '../../components/section-heading/section-heading';
import { Reveal } from '../../shared/reveal.directive';
import { experience } from '../../data/experience';
import { isPlaceholder } from '../../shared/placeholder';

@Component({
  selector: 'app-experience',
  imports: [Icon, SectionHeading, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="experience" class="scroll-mt-20 py-24 sm:py-28" aria-labelledby="experience-title">
      <div class="container-page">
        <app-section-heading
          headingId="experience-title"
          title="Experience"
          description="Two tracks of work that inform each other: teaching information technology and developing software."
        />

        <ol
          class="relative mt-12 space-y-6 before:absolute before:top-6 before:bottom-6 before:left-[23px] before:w-0.5 before:rounded-full before:bg-line-strong"
        >
          @for (item of entries; track $index; let i = $index) {
            <li
              appReveal
              [revealDelay]="i * 80"
              class="relative grid grid-cols-[48px_1fr] gap-4 sm:gap-8"
            >
              <span
                class="relative z-10 grid size-12 place-items-center rounded-2xl bg-accent text-accent-ink"
                aria-hidden="true"
              >
                <svg
                  [appIcon]="item.type === 'education' ? 'presentation' : 'code'"
                  class="size-5"
                ></svg>
              </span>

              <article class="rounded-3xl bg-tile p-6 sm:p-8">
                <p class="text-sm text-muted">
                  <span [class.placeholder-text]="isPlaceholder(item.period)">{{
                    item.period
                  }}</span>
                </p>
                <h3 class="mt-2 text-2xl font-medium text-ink">{{ item.role }}</h3>
                <p class="mt-1 text-ink-soft">
                  <span [class.placeholder-text]="isPlaceholder(item.organization)">{{
                    item.organization
                  }}</span>
                </p>
                <p class="mt-4 max-w-3xl leading-relaxed text-muted">{{ item.description }}</p>

                @if (item.highlights?.length) {
                  <p class="mt-6 font-display font-medium text-ink">
                    {{ item.highlightsLabel ?? 'Highlights' }}
                  </p>
                  <ul class="mt-3 flex flex-wrap gap-2">
                    @for (highlight of item.highlights; track highlight) {
                      <li class="rounded-full bg-surface px-3.5 py-1.5 text-sm text-ink-soft">
                        {{ highlight }}
                      </li>
                    }
                  </ul>
                }

                @if (item.technologies?.length) {
                  <ul class="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
                    @for (tech of item.technologies; track tech) {
                      <li class="rounded-full bg-surface px-3.5 py-1.5 text-sm text-ink-soft">
                        {{ tech }}
                      </li>
                    }
                  </ul>
                }
              </article>
            </li>
          }
        </ol>
      </div>
    </section>
  `,
})
export class Experience {
  protected readonly entries = experience;
  protected readonly isPlaceholder = isPlaceholder;
}
