import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Decorative hero illustration: a desk with a laptop, a code-bracket whiteboard,
 * a plant, and a mug — standing in for a portrait until `profile.photo` is set.
 * Colors come from the --art-* tokens in styles.css, so it adapts to both themes.
 */
@Component({
  selector: 'app-workspace-illustration',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  styles: `
    :host {
      display: block;
    }
    .ln {
      stroke: var(--art-line);
      stroke-width: 3;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .f-surface {
      fill: var(--surface);
    }
    .f-fill {
      fill: var(--art-fill);
    }
    .f-warm {
      fill: var(--art-warm);
    }
    .f-line {
      fill: var(--art-line);
    }
    .f-leaf {
      fill: var(--art-leaf);
    }
    .f-desk {
      fill: var(--tile-strong);
    }
    .f-muted {
      fill: var(--line-strong);
    }
    .s-warm {
      stroke: var(--art-warm);
    }
    .s-muted {
      stroke: var(--line-strong);
    }
  `,
  template: `
    <svg viewBox="0 0 400 400" class="size-full" fill="none">
      <!-- Whiteboard with code brackets -->
      <g class="float">
        <rect x="108" y="64" width="184" height="116" rx="14" class="f-surface ln" />
        <path d="M108 88h184" class="ln" />
        <circle cx="124" cy="76" r="3.5" class="f-line" />
        <circle cx="137" cy="76" r="3.5" class="f-line" />
        <circle cx="150" cy="76" r="3.5" class="f-line" />
        <path
          d="M168 116l-18 18 18 18M232 116l18 18-18 18M212 110l-24 48"
          class="s-warm"
          stroke-width="6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>

      <!-- Sparkles -->
      <path d="M332 104l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" class="f-warm" />
      <path d="M72 128l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" class="f-warm" opacity="0.7" />

      <!-- Desk -->
      <rect x="0" y="312" width="400" height="88" class="f-desk" />
      <rect x="24" y="302" width="352" height="14" rx="7" class="f-warm ln" />

      <!-- Plant -->
      <ellipse
        cx="70"
        cy="238"
        rx="9"
        ry="22"
        transform="rotate(-28 70 238)"
        class="f-leaf ln"
        stroke-width="2.5"
      />
      <ellipse
        cx="92"
        cy="234"
        rx="9"
        ry="24"
        transform="rotate(24 92 234)"
        class="f-leaf ln"
        stroke-width="2.5"
      />
      <ellipse cx="80" cy="220" rx="8" ry="22" class="f-leaf ln" stroke-width="2.5" />
      <path d="M58 262h44l-6 40H64z" class="f-warm ln" />

      <!-- Laptop -->
      <rect x="120" y="190" width="160" height="106" rx="10" class="f-fill ln" />
      <rect x="138" y="210" width="52" height="7" rx="3.5" class="f-warm" />
      <rect x="138" y="225" width="96" height="7" rx="3.5" class="f-muted" />
      <rect x="152" y="240" width="72" height="7" rx="3.5" class="f-muted" />
      <rect x="152" y="255" width="44" height="7" rx="3.5" class="f-warm" />
      <rect x="138" y="270" width="60" height="7" rx="3.5" class="f-muted" />
      <rect x="204" y="268" width="4" height="12" rx="1" class="f-line caret" />
      <path d="M98 296h204l-10 10H108z" class="f-line" />

      <!-- Mug with steam -->
      <path
        d="M312 234c-7-8 7-12 0-22M328 234c-7-8 7-12 0-22"
        class="s-muted"
        stroke-width="3"
        stroke-linecap="round"
      />
      <rect x="302" y="248" width="38" height="52" rx="8" class="f-warm ln" />
      <path d="M340 260c16 0 16 26 0 26" class="ln" />
    </svg>
  `,
})
export class WorkspaceIllustration {}
