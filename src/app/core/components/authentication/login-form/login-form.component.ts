import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    ValidationErrors,
    Validators
} from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { TextInputComponent } from '../custom-text-input/custom-text-input.component';
import { UserCredentialsModel } from '../../../models/userCredentials.model';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, TextInputComponent, MatRippleModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {

    @Input() isLoading: boolean = false;
    @Output() login: EventEmitter<UserCredentialsModel> = new EventEmitter<UserCredentialsModel>();
    loginForm: FormGroup;
    readonly MAT_RIPPLE_COLOR = 'rgba(255, 255, 255, 0.1)';
    private readonly EMAIL_PATTERN: RegExp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    constructor(private formBuilder: FormBuilder) {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, this.customEmailValidator.bind(this)]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    get email(): FormControl {
        return this.loginForm.get('email') as FormControl;
    }

    get password(): FormControl {
        return this.loginForm.get('password') as FormControl;
    }

    onSubmit(): void {
        if (this.loginForm.invalid) {
            return;
        }
        const userCredentials: UserCredentialsModel = { email: this.email.value, password: this.password.value };
        this.login.emit(userCredentials);
    }

    private customEmailValidator(control: AbstractControl): ValidationErrors | null {
        return this.EMAIL_PATTERN.test(control.value) ? null : { invalidEmail: true };
    }
}
