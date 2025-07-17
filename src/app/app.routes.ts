import { Routes } from '@angular/router';
import { introGuard } from './guards/intro.guard';
import { homeGuard } from './guards/home.guard';

// agregar el guar de login

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage), canActivate:[introGuard, homeGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'intro',
    loadComponent: () => import('./intro/intro.page').then( m => m.IntroPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
];
