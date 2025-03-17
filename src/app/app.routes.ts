import { Routes } from '@angular/router';
import { LoginComponent } from "./core/components/authentication/login/login.component";
import { authenticationGuard, unauthenticationGuard } from "./core/guards/authentication.guard";

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [authenticationGuard]
    },
    {
        path: 'goals',
        loadComponent: () => import('./core/pages/goals-page/goals-page.component').then(_ => _.GoalsPageComponent),
        canActivate: [unauthenticationGuard]
    },
    {
        path: 'credits',
        loadComponent: () => import('./core/pages/credits-page/credits-page.component').then(_ => _.CreditsPageComponent),
        canActivate: [unauthenticationGuard]
    },
    {
        path: 'cats',
        loadComponent: () => import('./core/pages/cats-page/cats-page.component').then(_ => _.CatsPageComponent),
        canActivate: [unauthenticationGuard]
    },
    {
        path: '**', redirectTo: '/login'
    }
];
