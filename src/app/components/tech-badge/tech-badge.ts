import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * Technology label. When `usedIn` lists projects, the badge is marked with an
 * accent dot and names those projects (tooltip + screen-reader text).
 */
@Component({
  selector: 'app-tech-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'inline-flex' },
  template: `
    <span
      class="chip transition-colors duration-200"
      [class.border-line-strong]="usedIn().length > 0"
      [class.text-ink]="usedIn().length > 0"
      [attr.title]="usageText()"
    >
      @if (usedIn().length > 0) {
        <span class="size-1.5 rounded-full bg-accent" aria-hidden="true"></span>
      }
      {{ name() }}
      @if (usageText(); as text) {
        <span class="sr-only">({{ text }})</span>
      }
    </span>
  `,
})
export class TechBadge {
  readonly name = input.required<string>();
  readonly usedIn = input<string[]>([]);

  protected readonly usageText = computed(() =>
    this.usedIn().length ? `Used in ${this.usedIn().join(', ')}` : null,
  );
}
