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
    <section
      id="contact"
      class="scroll-mt-16 border-t border-line py-24 sm:py-32"
      aria-labelledby="contact-title"
    >
      <div class="container-page">
        <div appReveal class="card relative isolate overflow-hidden px-6 py-12 sm:px-12 sm:py-16">
          <div class="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true"></div>

          <div class="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p class="eyebrow flex items-center gap-3">
                <span class="text-muted">06</span>
                <span class="h-px w-8 bg-line-strong" aria-hidden="true"></span>
                <span>Contact</span>
              </p>
              <h2
                id="contact-title"
                class="mt-5 text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
              >
                Have a project, collaboration, or technology-related opportunity?
                <span class="mt-2 block text-accent">Let's connect.</span>
              </h2>
              <p class="mt-5 max-w-md leading-relaxed text-muted">
                I'm open to conversations about software projects, information systems, training,
                and IT education.
              </p>
              <div class="mt-8 flex flex-wrap gap-3">
                @if (emailLink) {
                  <a [href]="emailLink" class="btn btn-primary">
                    <svg appIcon="mail" class="size-4"></svg>
                    Send an email
                  </a>
                }
                <app-resume-button />
              </div>
            </div>

            <ul class="grid content-start gap-3">
              @for (link of links; track link.label) {
                <li>
                  @if (!isPlaceholder(link.url)) {
                    <a
                      [href]="link.url"
                      [attr.target]="link.external ? '_blank' : null"
                      [attr.rel]="link.external ? 'noopener noreferrer' : null"
                      class="group flex min-h-16 items-center gap-4 rounded-xl border border-line bg-surface px-4 py-3 transition-colors hover:border-line-strong"
                    >
                      <span
                        class="grid size-10 place-items-center rounded-lg bg-surface-2 text-ink-soft group-hover:text-accent"
                      >
                        <svg [appIcon]="link.icon" class="size-[18px]"></svg>
                      </span>
                      <span class="min-w-0 flex-1">
                        <span class="block text-sm font-medium text-ink">{{ link.label }}</span>
                        <span class="block truncate font-mono text-xs text-muted">{{
                          link.display
                        }}</span>
                      </span>
                      <svg
                        appIcon="arrow-up-right"
                        class="size-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      ></svg>
                      @if (link.external) {
                        <span class="sr-only">(opens in a new tab)</span>
                      }
                    </a>
                  } @else {
                    <!-- Placeholder: shown as a marked, non-clickable row until real data is added. -->
                    <div
                      class="flex min-h-16 items-center gap-4 rounded-xl border border-dashed border-line-strong px-4 py-3"
                    >
                      <span
                        class="grid size-10 place-items-center rounded-lg bg-surface-2 text-muted"
                      >
                        <svg [appIcon]="link.icon" class="size-[18px]"></svg>
                      </span>
                      <span class="min-w-0 flex-1">
                        <span
                          class="block text-sm font-medium"
                          [class]="isPlaceholder(link.label) ? 'text-muted' : 'text-ink'"
                        >
                          {{ link.label }}
                        </span>
                        <span class="block truncate font-mono text-xs text-muted">{{
                          link.url
                        }}</span>
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
