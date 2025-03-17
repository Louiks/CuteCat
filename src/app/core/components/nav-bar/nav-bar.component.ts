import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostListener,
    OnDestroy,
    OnInit,
    ViewChildren
} from '@angular/core';
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatRipple } from "@angular/material/core";
import { NavigationEnd, Router, RouterLink } from "@angular/router";
import { AuthenticationService } from "../../services/authentication.service";
import { filter, Subscription } from "rxjs";

@Component({
    selector: 'app-nav-bar',
    imports: [MatIconButton, MatIcon, MatRipple, MatButton, RouterLink],
    templateUrl: './nav-bar.component.html',
    styleUrl: './nav-bar.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavBarComponent implements OnInit, OnDestroy {

    @ViewChildren('nav') nav?: HTMLElement;

    readonly CATS_ROUTE: string = '/cats';
    readonly GOALS_ROUTE: string = '/goals';
    readonly CREDITS_ROUTE: string = '/credits';
    readonly MAT_RIPPLE_COLOR: string = "rgba(255, 255, 255, 0.2)";
    readonly buttons = [
        {
            title: 'Navigate to Cats page',
            label: 'Cats', route: this.CATS_ROUTE,
            rippleColor: this.MAT_RIPPLE_COLOR
        },
        {
            title: 'Navigate to Goals page',
            label: 'Goals', route: this.GOALS_ROUTE,
            rippleColor: this.MAT_RIPPLE_COLOR
        },
        {
            title: 'Navigate to Credits page',
            label: 'Credits',
            route: this.CREDITS_ROUTE,
            rippleColor: this.MAT_RIPPLE_COLOR
        }
    ];
    private lastScrollY: number = window.scrollY;
    private routeSubscription?: Subscription;

    constructor(private elementRef: ElementRef,
                public router: Router,
                private authenticationService: AuthenticationService,
                private changeDetectorRef: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.routeSubscription = this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe(() => this.onRouteChange());
    }

    ngOnDestroy(): void {
        this.routeSubscription?.unsubscribe();
    }

    onRouteChange(): void {
        this.changeDetectorRef.detectChanges();
    }

    @HostListener('window:scroll', [])
    onScroll(): void {
        const nav = this.elementRef.nativeElement.querySelector('.navbar');
        if (!nav) return;

        if (this.lastScrollY < window.scrollY) {
            nav.classList.add('navbar--hidden');
        } else {
            nav.classList.remove('navbar--hidden');
        }

        this.lastScrollY = window.scrollY;
    }

    isActive(route: string): boolean {
        return this.router.url === route;
    }

    logout(): void {
        this.authenticationService.logout();
        window.location.reload();
    }

    isLoggedIn(): boolean {
        return this.authenticationService.isLoggedIn();
    }
}
