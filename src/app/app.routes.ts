import { ResolveFn, Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { findProject } from './data/projects';

export const SITE_TITLE = 'Christian B. Peña | IT Educator & Software Developer';

const projectTitle: ResolveFn<string> = (route) => {
  const project = findProject(route.paramMap.get('id'));
  return project ? `${project.title} | Christian B. Peña` : `Project not found | Christian B. Peña`;
};

export const routes: Routes = [
  { path: '', component: Home, title: SITE_TITLE },
  {
    path: 'projects/:id',
    loadComponent: () =>
      import('./pages/project-detail/project-detail').then((m) => m.ProjectDetail),
    title: projectTitle,
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
    title: `Page not found | Christian B. Peña`,
  },
];
