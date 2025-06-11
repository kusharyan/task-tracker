import { Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LayoutComponent } from './components/layout/layout.component';
import { authGuard } from './AuthGuards/auth.guard';

export const routes: Routes = [
  {
    path: 'layout',
    component: LayoutComponent,
    canActivate: [authGuard]
  },
  {
    path: 'login-form',
    component: LoginFormComponent
  },
  {
    path: '',
    redirectTo: 'login-form',
    pathMatch: 'full'
  }
];