 import { Routes } from '@angular/router';
import { authGuard } from './AuthGuards/auth.guard';

export const routes: Routes = [
  {
    path: 'layout',
    loadComponent: ()=> import('./components/layout/layout.component').then(m=> m.LayoutComponent),
    canActivate: [authGuard]
  },
  {
    path: 'login-form',
    loadComponent: ()=> import('./components/login-form/login-form.component').then(m=> m.LoginFormComponent)
  },
  {
    path: '',
    redirectTo: 'login-form',
    pathMatch: 'full'
  }
];