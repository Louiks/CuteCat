import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

const CATS_ROUTE: string = '/cats';
const LOGIN_ROUTE: string = '/login';

export const authenticationGuard: CanActivateFn = () => {
    const authService: AuthenticationService = inject(AuthenticationService);
    const router: Router = inject(Router);
    if (authService.isLoggedIn()) {
        void router.navigate([CATS_ROUTE]);
        return false;
    }
    return true;
};

export const unauthenticationGuard: CanActivateFn = () => {
    const authService: AuthenticationService = inject(AuthenticationService);
    const router: Router = inject(Router);
    if (!authService.isLoggedIn()) {
        void router.navigate([LOGIN_ROUTE]);
        return false;
    }
    return true;
};
