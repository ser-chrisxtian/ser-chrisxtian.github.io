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
      class="scroll-mt-16 border-t border-line py-24 sm:py-32"
      aria-labelledby="about-title"
    >
      <div class="container-page">
        <app-section-heading
          index="01"
          eyebrow="About"
          headingId="about-title"
          [title]="profile.headline"
        />

        <div class="mt-12 grid gap-12 lg:grid-cols-12">
          <div
            appReveal
            class="space-y-5 text-base leading-relaxed text-ink-soft sm:text-[17px] lg:col-span-7"
          >
            @for (paragraph of profile.bio; track $index) {
              <p>{{ paragraph }}</p>
            }
          </div>

          <aside appReveal [revealDelay]="100" class="lg:col-span-5" aria-labelledby="focus-title">
            <div class="card p-6">
              <h3 id="focus-title" class="font-mono text-xs tracking-[0.14em] text-muted uppercase">
                Areas of work
              </h3>
              <ul class="mt-4 divide-y divide-line">
                @for (interest of profile.interests; track interest) {
                  <li class="flex items-center gap-3 py-2.5 text-sm text-ink">
                    <svg appIcon="check" class="size-4 text-accent"></svg>
                    {{ interest }}
                  </li>
                }
              </ul>
            </div>
          </aside>
        </div>

        <h3 appReveal class="mt-20 text-sm font-medium text-muted">What I do</h3>
        <ul class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          @for (pillar of profile.pillars; track pillar.title; let i = $index) {
            <li
              appReveal
              [revealDelay]="i * 80"
              class="card group p-6 transition-colors duration-300 hover:border-line-strong"
            >
              <span
                class="grid size-10 place-items-center rounded-lg border border-line bg-surface-2 text-accent transition-colors group-hover:border-accent/40"
              >
                <svg [appIcon]="pillar.icon" class="size-5"></svg>
              </span>
              <p class="mt-5 text-base font-semibold text-ink">{{ pillar.title }}</p>
              <p class="mt-2 text-sm leading-relaxed text-muted">{{ pillar.description }}</p>
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
