import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private readonly MOCK_LOGIN_DELAY: number = 2000;
    private readonly TOKEN_RADIX: number = 36;
    private readonly LOGIN_TOKEN_KEY: string = 'loginToken';

    isLoggedIn(): boolean {
        const token: string | null = localStorage.getItem(this.LOGIN_TOKEN_KEY);
        return Boolean(token);
    }

    login(email: string, password: string): Observable<void> {
        return of(undefined).pipe(
            delay(this.MOCK_LOGIN_DELAY),
            tap(() => {
                localStorage.setItem(this.LOGIN_TOKEN_KEY, this.generateToken());
            })
        );
    }

    logout(): void {
        localStorage.removeItem(this.LOGIN_TOKEN_KEY);
    }

    private generateToken(): string {
        return Math.random().toString(this.TOKEN_RADIX).substring(2);
    }
}
