import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  DestroyRef,
  afterNextRender,
  inject,
} from '@angular/core';
import { Hero } from '../../sections/hero/hero';
import { About } from '../../sections/about/about';
import { Skills } from '../../sections/skills/skills';
import { Projects } from '../../sections/projects/projects';
import { Experience } from '../../sections/experience/experience';
import { Education } from '../../sections/education/education';
import { Contact } from '../../sections/contact/contact';
import { ActiveSectionService } from '../../shared/sections';

@Component({
  selector: 'app-home',
  imports: [Hero, About, Skills, Projects, Experience, Education, Contact],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-hero />
    <app-about />
    <app-skills />
    <app-projects />
    <app-experience />
    <app-education />
    <app-contact />
  `,
})
export class Home {
  constructor() {
    const document = inject(DOCUMENT);
    const activeSection = inject(ActiveSectionService);
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const stop = activeSection.observe(document);
      destroyRef.onDestroy(stop);
    });
  }
}
