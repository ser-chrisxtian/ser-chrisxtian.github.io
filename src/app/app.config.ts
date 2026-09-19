import { ViewportScroller } from '@angular/common';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withRouterConfig,
} from '@angular/router';
import { routes } from './app.routes';

/** Height of the sticky navbar plus a little breathing room, used when scrolling to #sections. */
const ANCHOR_OFFSET_PX = 80;

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
      // Re-scroll when a nav link for the current #section is clicked again.
      withRouterConfig({ onSameUrlNavigation: 'reload' }),
    ),
    provideAppInitializer(() => {
      const scroller = inject(ViewportScroller);
      scroller.setOffset([0, ANCHOR_OFFSET_PX]);
      // Page changes should jump to the top instantly; only #section links scroll smoothly
      // (via `scroll-behavior: smooth` in styles.css). The router omits a behavior for new pages.
      const scrollToPosition = scroller.scrollToPosition.bind(scroller);
      scroller.scrollToPosition = (position, options) =>
        scrollToPosition(position, options ?? { behavior: 'instant' });
    }),
  ],
};
