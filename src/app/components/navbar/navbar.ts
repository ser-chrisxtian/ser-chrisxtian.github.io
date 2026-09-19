import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  DestroyRef,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Icon } from '../icon/icon';
import { ThemeToggle } from '../theme-toggle/theme-toggle';
import { ResumeButton } from '../resume-button/resume-button';
import { ActiveSectionService, PAGE_SECTIONS } from '../../shared/sections';
import { profile } from '../../data/profile';
import { isPlaceholder } from '../../shared/placeholder';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, Icon, ThemeToggle, ResumeButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navbar.html',
  host: { '(document:keydown.escape)': 'closeMenu()' },
})
export class Navbar {
  protected readonly sections = PAGE_SECTIONS;
  /** Desktop text links; Contact is rendered separately as a button. */
  protected readonly linkSections = PAGE_SECTIONS.filter((section) => section.id !== 'contact');
  protected readonly profile = profile;
  protected readonly hasGithub = !isPlaceholder(profile.githubUrl);
  protected readonly active = inject(ActiveSectionService).active;
  protected readonly menuOpen = signal(false);
  protected readonly scrolled = signal(false);

  constructor() {
    const document = inject(DOCUMENT);
    const destroyRef = inject(DestroyRef);

    inject(Router)
      .events.pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.menuOpen.set(false));

    afterNextRender(() => {
      const view = document.defaultView;
      if (!view) return;
      const onScroll = () => this.scrolled.set(view.scrollY > 8);
      onScroll();
      view.addEventListener('scroll', onScroll, { passive: true });
      destroyRef.onDestroy(() => view.removeEventListener('scroll', onScroll));
    });
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
