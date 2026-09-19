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
      class="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 text-sm transition-colors duration-200"
      [class]="usedIn().length > 0 ? 'text-ink' : 'text-ink-soft'"
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
