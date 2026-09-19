import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { Icon } from '../../components/icon/icon';
import { NotFound } from '../not-found/not-found';
import { Reveal } from '../../shared/reveal.directive';
import { findProject, projects } from '../../data/projects';
import { isPlaceholder } from '../../shared/placeholder';

@Component({
  selector: 'app-project-detail',
  imports: [RouterLink, Icon, NotFound, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './project-detail.html',
})
export class ProjectDetail {
  /** Bound from the `:id` route parameter. */
  readonly id = input.required<string>();

  protected readonly project = computed(() => findProject(this.id()));
  protected readonly isPlaceholder = isPlaceholder;

  protected readonly neighbours = computed(() => {
    const index = projects.findIndex((p) => p.id === this.id());
    if (index === -1 || projects.length < 2) return null;
    return {
      previous: projects[(index - 1 + projects.length) % projects.length],
      next: projects[(index + 1) % projects.length],
    };
  });

  constructor() {
    const meta = inject(Meta);
    const defaultDescription = meta.getTag('name="description"')?.content ?? '';

    effect(() => {
      const project = this.project();
      if (project) meta.updateTag({ name: 'description', content: project.description });
    });
    inject(DestroyRef).onDestroy(() =>
      meta.updateTag({ name: 'description', content: defaultDescription }),
    );
  }
}
