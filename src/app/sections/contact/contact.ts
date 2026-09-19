import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icon } from '../../components/icon/icon';
import { ResumeButton } from '../../components/resume-button/resume-button';
import { Reveal } from '../../shared/reveal.directive';
import { SocialLink, profile } from '../../data/profile';
import { isPlaceholder } from '../../shared/placeholder';

interface ContactLink extends SocialLink {
  /** Text shown under the label (e.g. the address or handle). */
  display: string;
  external: boolean;
}

@Component({
  selector: 'app-contact',
  imports: [Icon, ResumeButton, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="contact" class="scroll-mt-20 py-24 sm:py-28" aria-labelledby="contact-title">
      <div class="container-page">
        <div appReveal class="rounded-[2.5rem] bg-tile px-6 py-12 sm:px-12 sm:py-16">
          <div class="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 id="contact-title" class="section-title">
                Have a project, collaboration, or technology-related opportunity?
                <span class="mt-3 block text-accent-text">Let’s connect.</span>
              </h2>
              <p class="mt-6 max-w-md text-lg leading-relaxed text-muted">
                I’m open to conversations about software projects, information systems, training,
                and IT education.
              </p>
              <div class="mt-9 flex flex-wrap gap-3">
                @if (emailLink) {
                  <a [href]="emailLink" class="btn btn-primary min-h-14 px-8 text-base">
                    <svg appIcon="mail" class="size-4"></svg>
                    Send an email
                  </a>
                }
                <app-resume-button class="[&_.btn]:min-h-14" />
              </div>
            </div>

            <ul class="grid content-center gap-3">
              @for (link of links; track link.label) {
                <li>
                  @if (!isPlaceholder(link.url)) {
                    <a
                      [href]="link.url"
                      [attr.target]="link.external ? '_blank' : null"
                      [attr.rel]="link.external ? 'noopener noreferrer' : null"
                      class="group flex min-h-18 items-center gap-4 rounded-2xl bg-surface px-5 py-3 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-card"
                    >
                      <span
                        class="grid size-11 place-items-center rounded-xl bg-accent-soft text-accent-text"
                      >
                        <svg [appIcon]="link.icon" class="size-5"></svg>
                      </span>
                      <span class="min-w-0 flex-1">
                        <span class="block font-display font-medium text-ink">{{
                          link.label
                        }}</span>
                        <span class="block truncate text-sm text-muted">{{ link.display }}</span>
                      </span>
                      <svg
                        appIcon="arrow-up-right"
                        class="size-5 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-text"
                      ></svg>
                      @if (link.external) {
                        <span class="sr-only">(opens in a new tab)</span>
                      }
                    </a>
                  } @else {
                    <!-- Placeholder: shown as a marked, non-clickable row until real data is added. -->
                    <div
                      class="flex min-h-18 items-center gap-4 rounded-2xl border-2 border-dashed border-line-strong px-5 py-3"
                    >
                      <span
                        class="grid size-11 place-items-center rounded-xl bg-surface text-muted"
                      >
                        <svg [appIcon]="link.icon" class="size-5"></svg>
                      </span>
                      <span class="min-w-0 flex-1">
                        <span
                          class="block font-display font-medium"
                          [class]="isPlaceholder(link.label) ? 'text-muted' : 'text-ink'"
                        >
                          {{ link.label }}
                        </span>
                        <span class="block truncate text-sm text-muted">{{ link.url }}</span>
                      </span>
                    </div>
                  }
                </li>
              }
            </ul>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Contact {
  protected readonly isPlaceholder = isPlaceholder;
  protected readonly emailLink = isPlaceholder(profile.email) ? null : `mailto:${profile.email}`;

  protected readonly links: ContactLink[] = [
    {
      label: 'Email',
      icon: 'mail',
      url: this.emailLink ?? profile.email,
      display: profile.email,
      external: false,
    },
    {
      label: 'GitHub',
      icon: 'github',
      url: profile.githubUrl,
      display: profile.githubUrl.replace(/^https?:\/\//, ''),
      external: true,
    },
    {
      label: 'LinkedIn',
      icon: 'linkedin',
      url: profile.linkedinUrl,
      display: profile.linkedinUrl.replace(/^https?:\/\//, ''),
      external: true,
    },
    ...profile.otherLinks.map((link) => ({
      ...link,
      display: link.url.replace(/^https?:\/\//, ''),
      external: true,
    })),
  ];
}
