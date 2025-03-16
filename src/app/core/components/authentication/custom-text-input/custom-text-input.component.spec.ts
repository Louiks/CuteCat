import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextInputComponent } from './custom-text-input.component';

describe('TextInputComponent', () => {
    let component: TextInputComponent;
    let fixture: ComponentFixture<TextInputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, TextInputComponent],
            declarations: []
        }).compileComponents();

        fixture = TestBed.createComponent(TextInputComponent);
        component = fixture.componentInstance;
    });

    it('should update error messages correctly', () => {
        //given
        component.label = 'Email';
        component.control = new FormControl('', { validators: [Validators.required, Validators.email] });

        //when
        component.control.markAsTouched();
        component.control.updateValueAndValidity();
        component['updateErrorMessages']();

        //then
        expect(component.errorMessages.length).toBe(1);
        expect(component.errorMessages).toContain('Email is required.');

        //when
        component.control.setValue('test@example.com');
        component.control.updateValueAndValidity();
        component['updateErrorMessages']();

        //then
        expect(component.errorMessages.length).toBe(0);
    });
});