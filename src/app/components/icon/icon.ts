import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ICONS, IconName } from './icons';

/**
 * Inline SVG icon. Decorative by default (aria-hidden); pair with visible text
 * or an aria-label on the parent control.
 *
 * Usage: <svg appIcon="github" class="size-4"></svg>
 */
@Component({
  selector: 'svg[appIcon]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': '1.75',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'aria-hidden': 'true',
    focusable: 'false',
    class: 'shrink-0',
  },
  template: `
    @for (d of paths(); track $index) {
      <svg:path [attr.d]="d" />
    }
  `,
})
export class Icon {
  readonly appIcon = input.required<IconName>();
  protected readonly paths = computed(() => ICONS[this.appIcon()]);
}
