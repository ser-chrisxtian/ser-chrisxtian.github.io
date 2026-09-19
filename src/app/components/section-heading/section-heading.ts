import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Reveal } from '../../shared/reveal.directive';

@Component({
  selector: 'app-section-heading',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div appReveal class="max-w-2xl">
      <h2 [id]="headingId()" class="section-title">{{ title() }}</h2>
      @if (description()) {
        <p class="mt-4 text-base leading-relaxed text-muted sm:text-lg">{{ description() }}</p>
      }
    </div>
  `,
})
export class SectionHeading {
  readonly title = input.required<string>();
  readonly headingId = input.required<string>();
  readonly description = input<string>();
}
