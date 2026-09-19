import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../components/icon/icon';
import { ResumeButton } from '../../components/resume-button/resume-button';
import { profile } from '../../data/profile';
import { isPlaceholder } from '../../shared/placeholder';

/** A token in the decorative code card; `kind` selects its syntax color. */
interface CodeToken {
  text: string;
  kind?: 'keyword' | 'name' | 'key' | 'string' | 'punct';
}

const list = (key: string, values: string[]): CodeToken[][] => [
  [{ text: '  ' }, { text: key, kind: 'key' }, { text: ': [', kind: 'punct' }],
  ...values.map((value) => [
    { text: '    ' },
    { text: `'${value}'`, kind: 'string' as const },
    { text: ',', kind: 'punct' as const },
  ]),
  [{ text: '  ],', kind: 'punct' }],
];

@Component({
  selector: 'app-hero',
  imports: [RouterLink, Icon, ResumeButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
})
export class Hero {
  protected readonly profile = profile;
  protected readonly hasGithub = !isPlaceholder(profile.githubUrl);

  /** Code snippet generated from profile data, so it stays in sync with profile.ts. */
  protected readonly codeLines: CodeToken[][] = [
    [
      { text: 'const ', kind: 'keyword' },
      { text: 'christian', kind: 'name' },
      { text: ' = {', kind: 'punct' },
    ],
    ...list('builds', profile.focusAreas),
    ...list('teaches', profile.teachingAreas),
    [
      { text: '  ' },
      { text: 'solves', kind: 'key' },
      { text: ': ', kind: 'punct' },
      { text: `'real-world problems'`, kind: 'string' },
      { text: ',', kind: 'punct' },
    ],
    [{ text: '};', kind: 'punct' }],
  ];

  protected readonly diagramNodes = [
    { x: 2, label: 'client' },
    { x: 123, label: 'api' },
    { x: 244, label: 'database' },
  ];

  protected readonly tokenClass: Record<NonNullable<CodeToken['kind']>, string> = {
    keyword: 'text-accent',
    name: 'text-ink',
    key: 'text-ink-soft',
    string: 'text-signal',
    punct: 'text-muted',
  };
}
