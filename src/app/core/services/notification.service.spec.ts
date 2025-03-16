import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
    let service: NotificationService;
    let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

    beforeEach(() => {
        const spy = jasmine.createSpyObj('MatSnackBar', ['open']);

        TestBed.configureTestingModule({
            providers: [
                NotificationService,
                { provide: MatSnackBar, useValue: spy }
            ]
        });

        service = TestBed.inject(NotificationService);
        snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    });

    it('should be created', () => {
        // given when then
        expect(service).toBeTruthy();
    });

    it('should show notification with correct message and configuration', () => {
        // given
        const message: string = 'Test Notification';

        // when
        service.showNotification(message);

        // then
        expect(snackBarSpy.open).toHaveBeenCalledWith(message, '', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
            panelClass: 'snack-bar-overwrite'
        });
    });
});