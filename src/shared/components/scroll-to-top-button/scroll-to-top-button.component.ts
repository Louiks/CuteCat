import { Component, Input } from '@angular/core';
import { MatRipple } from "@angular/material/core";
import { MatIcon } from "@angular/material/icon";
import { MatIconButton } from "@angular/material/button";

@Component({
    selector: 'app-scroll-to-top-button',
    imports: [MatRipple, MatIcon, MatIconButton],
    templateUrl: './scroll-to-top-button.component.html',
    styleUrl: './scroll-to-top-button.component.scss',
    standalone: true
})
export class ScrollToTopButtonComponent {

    readonly MAT_RIPPLE_COLOR: string = "rgba(0, 0, 0, 0.1)";
    readonly SMOOTH_SCROLL_TOP_OPTIONS: ScrollToOptions = { top: 0, behavior: 'smooth' };

    @Input() isVisible: boolean = false;

    buttonClicked(): void {
        window.scrollTo(this.SMOOTH_SCROLL_TOP_OPTIONS);
    }
}
