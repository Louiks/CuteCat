import { Component } from '@angular/core';

import { Subject, takeUntil } from "rxjs";
import { Router } from "@angular/router";
import { LoginFormComponent } from "../login-form/login-form.component";
import { AuthenticationService } from "../../../services/authentication.service";
import { UserCredentialsModel } from "../../../models/userCredentials.model";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    standalone: true,
    imports: [
        LoginFormComponent
    ]
})
export class LoginComponent {

    destroyed$: Subject<void> = new Subject<void>();
    loading: boolean = false;

    private readonly CATS_ROUTE: string = '/cats';

    constructor(public authenticationService: AuthenticationService, private router: Router) {
    }

    onLogin(userCredentials: UserCredentialsModel): void {
        this.loading = true;
        this.authenticationService.login(userCredentials.email, userCredentials.password)
            .pipe(takeUntil(this.destroyed$))
            .subscribe({
                next: () => {
                    this.loading = false;
                    void this.router.navigate([this.CATS_ROUTE]);
                }
            });
    }
}
