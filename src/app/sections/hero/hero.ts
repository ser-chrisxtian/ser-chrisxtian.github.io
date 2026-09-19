import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../components/icon/icon';
import { ResumeButton } from '../../components/resume-button/resume-button';
import { WorkspaceIllustration } from './workspace-illustration';
import { profile } from '../../data/profile';
import { isPlaceholder } from '../../shared/placeholder';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, Icon, ResumeButton, WorkspaceIllustration],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
})
export class Hero {
  protected readonly profile = profile;
  protected readonly hasGithub = !isPlaceholder(profile.githubUrl);
}
