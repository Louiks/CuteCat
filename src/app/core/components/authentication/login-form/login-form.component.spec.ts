import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { LoginFormComponent } from './login-form.component';
import { UserCredentialsModel } from '../../../models/userCredentials.model';

describe('LoginFormComponent', () => {
    let component: LoginFormComponent;
    let fixture: ComponentFixture<LoginFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, LoginFormComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(LoginFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should emit login event with user credentials when form is valid', () => {
        // given
        const validEmail: string = 'test@example.com';
        const validPassword: string = 'password123';
        spyOn(component.login, 'emit');

        // when
        component.email.setValue(validEmail);
        component.password.setValue(validPassword);
        component.onSubmit();

        // then
        expect(component.login.emit).toHaveBeenCalledWith({
            email: validEmail,
            password: validPassword
        } as UserCredentialsModel);
    });

    it('should not emit login event when form is invalid', () => {
        // given
        spyOn(component.login, 'emit');

        // when
        component.email.setValue('');
        component.password.setValue('');
        component.onSubmit();

        // then
        expect(component.login.emit).not.toHaveBeenCalled();
    });

    it('should validate email format correctly', () => {
        // given
        const invalidEmail: string = 'invalid-email';
        const validEmail: string = 'test@example.com';

        // when
        component.email.setValue(invalidEmail);
        const invalidErrors: ValidationErrors | null = component.email.errors;

        component.email.setValue(validEmail);
        const validErrors: ValidationErrors | null = component.email.errors;

        // then
        expect(invalidErrors).toEqual({ invalidEmail: true });
        expect(validErrors).toBeNull();
    });

    it('should validate password length correctly', () => {
        // given
        const shortPassword: string = '123';
        const validPassword: string = 'password123';
        const requiredLength: number = 6;
        const expectedLength: number = 3;

        // when
        component.password.setValue(shortPassword);
        const shortPasswordErrors: ValidationErrors | null = component.password.errors;

        component.password.setValue(validPassword);
        const validPasswordErrors: ValidationErrors | null = component.password.errors;

        // then
        expect(shortPasswordErrors).toEqual({ minlength: { requiredLength, actualLength: expectedLength } });
        expect(validPasswordErrors).toBeNull();
    });
});