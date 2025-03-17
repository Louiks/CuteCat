import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
    let service: AuthenticationService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AuthenticationService);

        localStorage.removeItem(service['LOGIN_TOKEN_KEY']);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return true if user is logged in (token is present)', () => {
        // given
        const testToken: string = 'testToken';
        const tokenBeforeLogin: string | null = localStorage.getItem(service['LOGIN_TOKEN_KEY']);
        localStorage.setItem(service['LOGIN_TOKEN_KEY'], testToken);

        // when
        const result: boolean = service.isLoggedIn();
        const tokenAfterLogin: string | null = localStorage.getItem(service['LOGIN_TOKEN_KEY']);

        // then
        expect(tokenBeforeLogin).toBeNull();
        expect(tokenAfterLogin).toBeTruthy();
        expect(result).toBeTrue();
    });

    it('should return false if user is not logged in (token is not present)', () => {
        // given
        const currentToken: string | null = localStorage.getItem(service['LOGIN_TOKEN_KEY']);

        // when
        const result: boolean = service.isLoggedIn();

        // then
        expect(currentToken).toBeNull();
        expect(result).toBeFalse();
    });

    it('should set token in localStorage on login', (done: DoneFn) => {
        // given
        const email: string = 'test@example.com';
        const password: string = 'P@ssw04d123';

        // when
        service.login(email, password).subscribe(() => {
            // then
            const currentToken: string | null = localStorage.getItem(service['LOGIN_TOKEN_KEY']);
            expect(currentToken).toBeTruthy();
            done();
        });
    });

    it('should remove token from localStorage on logout', () => {
        // given
        localStorage.setItem(service['LOGIN_TOKEN_KEY'], 'testToken');

        // when
        service.logout();

        // then
        const token: string | null = localStorage.getItem(service['LOGIN_TOKEN_KEY']);
        expect(token).toBeNull();
    });

    it('should generate a token', () => {
        // given
        const tokenRegExp: RegExp = /^[0-9a-z]+$/;

        // when
        const token: string = service['generateToken']();

        // then
        expect(token).toMatch(tokenRegExp);
    });
});