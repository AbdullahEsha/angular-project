import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    async loadComponent() {
      const m = await import('./home/home.component');
      return m.HomeComponent;
    },
  },
  {
    path: 'login',
    async loadComponent() {
      const m = await import('./auth/login/login.component');
      return m.LoginComponent;
    },
  },
  {
    path: 'register',
    async loadComponent() {
      const m = await import('./auth/register/register.component');
      return m.RegisterComponent;
    },
  },
  {
    path: 'admin',
    async loadComponent() {
      const m = await import('./admin/admin.component');
      return m.AdminComponent;
    },
  },
  { path: '**', redirectTo: '' }, // Handle undefined routes
];
