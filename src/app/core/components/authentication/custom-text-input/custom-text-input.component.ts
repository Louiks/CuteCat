import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StrengthenPipe } from '../../../pipes/strengthen.pipe';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-custom-text-input',
    templateUrl: './custom-text-input.component.html',
    styleUrls: ['./custom-text-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ReactiveFormsModule, StrengthenPipe]
})
export class TextInputComponent implements OnInit, OnChanges, OnDestroy {

    @Input() control!: FormControl;
    @Input() controlName!: string;
    @Input() label!: string;
    @Input() type: string = 'text';
    @Input() isRequired: boolean = false;
    @Input() disabled: boolean = false;

    errorMessages: string[] = [];

    private unsubscribe$ = new Subject<void>();

    ngOnInit(): void {
        this.control.statusChanges.pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(() => this.updateErrorMessages());
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['disabled']) {
            if (this.disabled) {
                this.control.disable();
            } else {
                this.control.enable();
            }
        }
    }

    private updateErrorMessages(): void {
        const errors = this.control.errors;
        this.errorMessages = [];

        if (!errors) {
            return;
        }

        if (errors['required']) {
            this.errorMessages.push(`${this.label} is required.`);
        }
        if (errors['invalidEmail']) {
            this.errorMessages.push('Invalid email format.');
        }
        if (errors['minlength']) {
            this.errorMessages.push(`Minimum length is ${errors['minlength'].requiredLength}.`);
        }
    }
}
