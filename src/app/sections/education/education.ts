import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icon } from '../../components/icon/icon';
import { SectionHeading } from '../../components/section-heading/section-heading';
import { Reveal } from '../../shared/reveal.directive';
import { education } from '../../data/education';
import { isPlaceholder } from '../../shared/placeholder';

@Component({
  selector: 'app-education',
  imports: [Icon, SectionHeading, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      id="education"
      class="scroll-mt-20 bg-canvas-alt py-24 sm:py-28"
      aria-labelledby="education-title"
    >
      <div class="container-page grid gap-10 lg:grid-cols-12 lg:items-center">
        <div class="lg:col-span-5">
          <app-section-heading
            headingId="education-title"
            title="Education"
            description="Formal education in information technology — the foundation for both my teaching and development work."
          />
        </div>

        <ul class="space-y-5 lg:col-span-7">
          @for (item of entries; track $index; let i = $index) {
            <li
              appReveal
              [revealDelay]="i * 80"
              class="flex gap-5 rounded-3xl bg-surface p-7 shadow-card sm:p-8"
            >
              <span
                class="grid size-14 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent-text"
                aria-hidden="true"
              >
                <svg appIcon="graduation-cap" class="size-7"></svg>
              </span>
              <div>
                <h3 class="text-xl font-medium text-ink sm:text-2xl">{{ item.credential }}</h3>
                <p class="mt-2 text-ink-soft">
                  <span [class.placeholder-text]="isPlaceholder(item.institution)">{{
                    item.institution
                  }}</span>
                </p>
                <p class="mt-2 text-sm text-muted">
                  <span [class.placeholder-text]="isPlaceholder(item.period)">{{
                    item.period
                  }}</span>
                </p>
                @if (item.details) {
                  <p class="mt-4 leading-relaxed text-muted">{{ item.details }}</p>
                }
              </div>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
})
export class Education {
  protected readonly entries = education;
  protected readonly isPlaceholder = isPlaceholder;
}
