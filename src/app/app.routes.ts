import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'routes',
    loadComponent: () =>
      import('./route-table/route-table.component').then(m => m.RouteTableComponent)
  },
  { path: '', redirectTo: 'routes', pathMatch: 'full' },
  { path: '**', redirectTo: 'routes' }
];
