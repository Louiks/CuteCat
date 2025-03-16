import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollToTopButtonComponent } from './scroll-to-top-button.component';
import { MatRipple } from "@angular/material/core";
import { MatIcon } from "@angular/material/icon";
import { MatIconButton } from "@angular/material/button";

describe('ScrollToTopButtonComponent', () => {
    let component: ScrollToTopButtonComponent;
    let fixture: ComponentFixture<ScrollToTopButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MatRipple, MatIcon, MatIconButton, ScrollToTopButtonComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ScrollToTopButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        // given when then
        expect(component).toBeTruthy();
    });

    it('should have correct ripple color constant', () => {
        // given when then
        expect(component.MAT_RIPPLE_COLOR).toBe('rgba(0, 0, 0, 0.1)');
    });

    it('should have correct smooth scroll options', () => {
        // given when then
        expect(component.SMOOTH_SCROLL_TOP_OPTIONS).toEqual({ top: 0, behavior: 'smooth' });
    });

    it('should scroll to top when buttonClicked is called', () => {
        // given
        spyOn(window, 'scrollTo');

        // when
        component.buttonClicked();

        // then
        // @ts-ignore
        expect(window.scrollTo).toHaveBeenCalledWith(component.SMOOTH_SCROLL_TOP_OPTIONS);
    });

    it('should have isVisible input', () => {
        // given
        component.isVisible = true;
        fixture.detectChanges();

        // when

        // then
        expect(component.isVisible).toBeTrue();
    });
});