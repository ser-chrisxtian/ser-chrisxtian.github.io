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
      class="scroll-mt-16 border-t border-line py-24 sm:py-32"
      aria-labelledby="education-title"
    >
      <div class="container-page grid gap-12 lg:grid-cols-12">
        <div class="lg:col-span-5">
          <app-section-heading
            index="05"
            eyebrow="Education"
            headingId="education-title"
            title="Academic background"
            description="Formal education in information technology, the foundation for both my teaching and development work."
          />
        </div>

        <ul class="space-y-4 lg:col-span-7 lg:pt-10">
          @for (item of entries; track $index; let i = $index) {
            <li appReveal [revealDelay]="i * 80" class="card flex gap-5 p-6 sm:p-7">
              <span
                class="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-surface-2 text-accent"
                aria-hidden="true"
              >
                <svg appIcon="graduation-cap" class="size-5"></svg>
              </span>
              <div>
                <h3 class="text-lg font-semibold tracking-tight text-ink">{{ item.credential }}</h3>
                <p class="mt-1 text-sm text-ink-soft">
                  <span [class.placeholder-text]="isPlaceholder(item.institution)">{{
                    item.institution
                  }}</span>
                </p>
                <p class="mt-3 font-mono text-xs text-muted">
                  <span [class.placeholder-text]="isPlaceholder(item.period)">{{
                    item.period
                  }}</span>
                </p>
                @if (item.details) {
                  <p class="mt-4 text-sm leading-relaxed text-muted">{{ item.details }}</p>
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
