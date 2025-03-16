import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { NavBarComponent } from './nav-bar.component';
import { ChangeDetectorRef, ElementRef } from '@angular/core';

describe('NavBarComponent', () => {
    let component: NavBarComponent;
    let fixture: ComponentFixture<NavBarComponent>;
    let router: Router;
    let authenticationService: jasmine.SpyObj<AuthenticationService>;
    let changeDetectorRef: jasmine.SpyObj<ChangeDetectorRef>;

    beforeEach(async () => {
        const authServiceSpy = jasmine.createSpyObj('AuthenticationService', ['logout', 'isLoggedIn']);
        const changeDetectorRefSpy = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);

        await TestBed.configureTestingModule({
            imports: [NavBarComponent],
            providers: [
                provideRouter([]),
                { provide: AuthenticationService, useValue: authServiceSpy },
                { provide: ChangeDetectorRef, useValue: changeDetectorRefSpy },
                { provide: ElementRef, useValue: new ElementRef(document.createElement('div')) }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(NavBarComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        authenticationService = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
        changeDetectorRef = TestBed.inject(ChangeDetectorRef) as jasmine.SpyObj<ChangeDetectorRef>;

        fixture.detectChanges();
    });

    it('should create', () => {
        // given when then
        expect(component).toBeTruthy();
    });

    it('should unsubscribe from routeSubscription on destroy', () => {
        // given
        component.ngOnInit();

        // when
        component.ngOnDestroy();

        // then
        expect(component['routeSubscription']?.closed).toBeTrue();
    });

    it('should add navbar--hidden class on scroll down', () => {
        // given
        const navElement = component['elementRef'].nativeElement.querySelector('.navbar');
        spyOn(navElement.classList, 'add');
        component['lastScrollY'] = 0;
        window['scrollY'] = 100;

        // when
        component.onScroll();

        // then
        expect(navElement.classList.add).toHaveBeenCalledWith('navbar--hidden');
    });

    it('should remove navbar--hidden class on scroll up', () => {
        // given
        const navElement = component['elementRef'].nativeElement.querySelector('.navbar');
        spyOn(navElement.classList, 'remove');
        component['lastScrollY'] = 100;
        window['scrollY'] = 0;

        // when
        component.onScroll();

        // then
        expect(navElement.classList.remove).toHaveBeenCalledWith('navbar--hidden');
    });

    it('should return true if the route is active', () => {
        // given
        spyOnProperty(router, 'url', 'get').and.returnValue('/cats');

        // when
        const result = component.isActive('/cats');

        // then
        expect(result).toBeTrue();
    });

    it('should return true if the user is logged in', () => {
        // given
        authenticationService.isLoggedIn.and.returnValue(true);

        // when
        const result = component.isLoggedIn();

        // then
        expect(result).toBeTrue();
    });
});