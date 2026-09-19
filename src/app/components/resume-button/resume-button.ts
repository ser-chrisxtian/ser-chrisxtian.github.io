import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Icon } from '../icon/icon';
import { ResumeService } from '../../shared/resume.service';

/**
 * Links to the resume PDF only once it has been confirmed to exist;
 * otherwise shows a non-interactive "in preparation" state.
 */
@Component({
  selector: 'app-resume-button',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
  template: `
    @if (resume.state() === 'available') {
      <a
        class="btn"
        [class.btn-primary]="variant() === 'primary'"
        [class.btn-secondary]="variant() === 'secondary'"
        [href]="resume.href"
        target="_blank"
        rel="noopener"
      >
        <svg appIcon="file-text" class="size-4"></svg>
        Resume
        <span class="sr-only">(PDF, opens in a new tab)</span>
      </a>
    } @else {
      <span
        class="btn cursor-default border border-dashed border-line-strong text-muted"
        role="note"
        title="The resume PDF will be available here soon."
      >
        <svg appIcon="clock" class="size-4"></svg>
        {{ resume.state() === 'checking' ? 'Resume' : 'Resume in preparation' }}
      </span>
    }
  `,
})
export class ResumeButton {
  protected readonly resume = inject(ResumeService);
  readonly variant = input<'primary' | 'secondary'>('secondary');
}
