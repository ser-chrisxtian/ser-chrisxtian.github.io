import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Reveal } from '../../shared/reveal.directive';

@Component({
  selector: 'app-section-heading',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div appReveal class="max-w-2xl">
      <p class="eyebrow flex items-center gap-3">
        <span class="text-muted">{{ index() }}</span>
        <span class="h-px w-8 bg-line-strong" aria-hidden="true"></span>
        <span>{{ eyebrow() }}</span>
      </p>
      <h2
        [id]="headingId()"
        class="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
      >
        {{ title() }}
      </h2>
      @if (description()) {
        <p class="mt-4 text-base leading-relaxed text-muted sm:text-lg">{{ description() }}</p>
      }
    </div>
  `,
})
export class SectionHeading {
  readonly index = input.required<string>();
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly headingId = input.required<string>();
  readonly description = input<string>();
}
