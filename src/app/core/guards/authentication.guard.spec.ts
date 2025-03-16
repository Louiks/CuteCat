import { TestBed } from '@angular/core/testing';
import { GuardResult, MaybeAsync, Router } from '@angular/router';
import { authenticationGuard, unauthenticationGuard } from './authentication.guard';
import { AuthenticationService } from '../services/authentication.service';

describe('authenticationGuard', () => {
    let authService: jasmine.SpyObj<AuthenticationService>;
    let router: jasmine.SpyObj<Router>;

    beforeEach(() => {
        const authServiceSpy = jasmine.createSpyObj('AuthenticationService', ['isLoggedIn']);
        const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

        TestBed.configureTestingModule({
            providers: [
                { provide: AuthenticationService, useValue: authServiceSpy },
                { provide: Router, useValue: routerSpy }
            ]
        });

        authService = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
        router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    });

    describe('authenticatedGuard', () => {

        // @ts-ignore
        const executeGuard = () => TestBed.runInInjectionContext(() => authenticationGuard());

        it('should navigate to /cats if user is logged in', () => {
            // given
            const HOME_ROUTE: string = '/cats';
            authService.isLoggedIn.and.returnValue(true);

            // when
            const result: MaybeAsync<GuardResult> = executeGuard();

            // then
            expect(router.navigate).toHaveBeenCalledWith([HOME_ROUTE]);
            expect(result).toBeFalse();
        });

        it('should allow access if user is not logged in', () => {
            // given
            authService.isLoggedIn.and.returnValue(false);

            // when
            const result: MaybeAsync<GuardResult> = executeGuard();

            // then
            expect(router.navigate).not.toHaveBeenCalled();
            expect(result).toBeTrue();
        });
    });

    describe('unauthenticatedGuard', () => {

        // @ts-ignore
        const executeGuard = () => TestBed.runInInjectionContext(() => unauthenticationGuard());

        it('should navigate to /login if user is not logged in', () => {
            // given
            const LOGIN_ROUTE: string = '/login';
            authService.isLoggedIn.and.returnValue(false);

            // when
            const result: MaybeAsync<GuardResult> = executeGuard();

            // then
            expect(router.navigate).toHaveBeenCalledWith([LOGIN_ROUTE]);
            expect(result).toBeFalse();
        });

        it('should allow access if user is logged in', () => {
            // given
            authService.isLoggedIn.and.returnValue(true);

            // when
            const result: MaybeAsync<GuardResult> = executeGuard();

            // then
            expect(router.navigate).not.toHaveBeenCalled();
            expect(result).toBeTrue();
        });
    });

});