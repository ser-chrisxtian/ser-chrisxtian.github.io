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
    <section
      id="experience"
      class="scroll-mt-16 border-t border-line py-24 sm:py-32"
      aria-labelledby="experience-title"
    >
      <div class="container-page">
        <app-section-heading
          index="04"
          eyebrow="Experience"
          headingId="experience-title"
          title="Teaching and building"
          description="Two tracks of work that inform each other: teaching information technology and developing software."
        />

        <ol
          class="relative mt-14 space-y-8 before:absolute before:top-2 before:bottom-2 before:left-[19px] before:w-px before:bg-line sm:before:left-[23px]"
        >
          @for (item of entries; track $index; let i = $index) {
            <li
              appReveal
              [revealDelay]="i * 80"
              class="relative grid grid-cols-[40px_1fr] gap-5 sm:grid-cols-[48px_1fr] sm:gap-8"
            >
              <span
                class="relative z-10 grid size-10 place-items-center rounded-xl border border-line-strong bg-canvas text-accent sm:size-12"
                aria-hidden="true"
              >
                <svg
                  [appIcon]="item.type === 'education' ? 'presentation' : 'code'"
                  class="size-5"
                ></svg>
              </span>

              <article class="card p-6 sm:p-7">
                <p class="font-mono text-xs text-muted">
                  <span [class.placeholder-text]="isPlaceholder(item.period)">{{
                    item.period
                  }}</span>
                </p>
                <h3 class="mt-3 text-lg font-semibold tracking-tight text-ink">{{ item.role }}</h3>
                <p class="mt-1 text-sm text-ink-soft">
                  <span [class.placeholder-text]="isPlaceholder(item.organization)">{{
                    item.organization
                  }}</span>
                </p>
                <p class="mt-4 max-w-3xl text-sm leading-relaxed text-muted sm:text-[15px]">
                  {{ item.description }}
                </p>

                @if (item.highlights?.length) {
                  <p class="mt-5 font-mono text-xs tracking-[0.14em] text-muted uppercase">
                    {{ item.highlightsLabel ?? 'Highlights' }}
                  </p>
                  <ul class="mt-3 flex flex-wrap gap-2">
                    @for (highlight of item.highlights; track highlight) {
                      <li class="rounded-md border border-line px-2.5 py-1 text-sm text-ink-soft">
                        {{ highlight }}
                      </li>
                    }
                  </ul>
                }

                @if (item.technologies?.length) {
                  <ul class="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
                    @for (tech of item.technologies; track tech) {
                      <li class="chip">{{ tech }}</li>
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
