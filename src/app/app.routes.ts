import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';

import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/pages/dashboard/dashboard.component')
            .then(m => m.DashboardComponent),
      },

      // Workforce Micro Frontend
      {
        path: 'employees',
        loadChildren: () =>
          loadRemoteModule('workforce-mfe', './routes')
            .then(m => m.EMPLOYEE_ROUTES),
      },

      // Organization Micro Frontend
      {
        path: 'organization',
        loadChildren: () =>
          loadRemoteModule('organization-mfe', './routes')
            .then(m => m.ORGANIZATION_ROUTES),
      },

      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];