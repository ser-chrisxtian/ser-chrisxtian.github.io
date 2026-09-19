import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icon } from '../../components/icon/icon';
import { SectionHeading } from '../../components/section-heading/section-heading';
import { Reveal } from '../../shared/reveal.directive';
import { profile } from '../../data/profile';

@Component({
  selector: 'app-about',
  imports: [Icon, SectionHeading, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      id="about"
      class="scroll-mt-20 bg-canvas-alt py-24 sm:py-28"
      aria-labelledby="about-title"
    >
      <div class="container-page">
        <app-section-heading headingId="about-title" title="About Me" />

        <div class="mt-10 grid gap-12 lg:grid-cols-12">
          <div appReveal class="space-y-5 text-lg leading-relaxed text-ink-soft lg:col-span-7">
            @for (paragraph of profile.bio; track $index) {
              <p>{{ paragraph }}</p>
            }
          </div>

          <aside appReveal [revealDelay]="100" class="lg:col-span-5" aria-labelledby="focus-title">
            <div class="rounded-3xl bg-tile p-7">
              <h3 id="focus-title" class="text-lg font-medium text-ink">Areas of work</h3>
              <ul class="mt-5 flex flex-wrap gap-2">
                @for (interest of profile.interests; track interest) {
                  <li class="rounded-full bg-surface px-3.5 py-1.5 text-sm text-ink-soft">
                    {{ interest }}
                  </li>
                }
              </ul>
            </div>
          </aside>
        </div>

        <h3 appReveal class="mt-20 text-2xl font-medium text-ink">What I do</h3>
        <ul class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          @for (pillar of profile.pillars; track pillar.title; let i = $index) {
            <li
              appReveal
              [revealDelay]="i * 80"
              class="group rounded-3xl bg-surface p-7 shadow-card transition-transform duration-300 hover:-translate-y-1"
            >
              <span
                class="grid size-12 place-items-center rounded-2xl bg-accent-soft text-accent-text"
              >
                <svg [appIcon]="pillar.icon" class="size-6"></svg>
              </span>
              <p class="mt-6 font-display text-xl font-medium text-ink">{{ pillar.title }}</p>
              <p class="mt-2 leading-relaxed text-muted">{{ pillar.description }}</p>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
})
export class About {
  protected readonly profile = profile;
}
