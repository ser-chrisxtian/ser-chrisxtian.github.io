import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Icon } from '../icon/icon';
import { ThemeService } from '../../shared/theme.service';

@Component({
  selector: 'app-theme-toggle',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="grid size-10 place-items-center rounded-lg text-ink-soft transition-colors hover:bg-surface-2 hover:text-ink"
      [attr.aria-label]="label()"
      [attr.title]="label()"
      (click)="theme.toggle()"
    >
      @if (theme.theme() === 'dark') {
        <svg appIcon="sun" class="size-[18px]"></svg>
      } @else {
        <svg appIcon="moon" class="size-[18px]"></svg>
      }
    </button>
  `,
})
export class ThemeToggle {
  protected readonly theme = inject(ThemeService);
  protected readonly label = computed(() =>
    this.theme.theme() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme',
  );
}
