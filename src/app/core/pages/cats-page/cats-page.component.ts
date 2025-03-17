import { AfterViewChecked, ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { CatDataService } from "../../../../shared/services/cat-data.service";
import { CatCardComponent } from "../../../../shared/components/cat-card/cat-card.component";
import { Observable } from "rxjs";
import { AsyncPipe } from "@angular/common";
import { MatProgressBar } from "@angular/material/progress-bar";
import {
    ScrollToTopButtonComponent
} from "../../../../shared/components/scroll-to-top-button/scroll-to-top-button.component";
import { Cat } from "../../../../shared/models/cat.model";

@Component({
    selector: 'app-cats-page-component',
    imports: [CatCardComponent, AsyncPipe, MatProgressBar, ScrollToTopButtonComponent],
    templateUrl: './cats-page.component.html',
    styleUrl: './cats-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class CatsPageComponent implements AfterViewChecked {

    shouldShowScrollTopButton: boolean = false;
    isLoadingCats$?: Observable<boolean>;
    cats$: Observable<Cat[]>;

    private readonly MINIMAL_SCROLL_TO_SHOW_TO_TOP_BUTTON: number = 200;
    private readonly CAT_NUMBER_PER_LOAD: number = 5;
    private readonly INTERSECTION_THRESHOLD: number = 0.1;
    private lastCatIntersectionObserver: IntersectionObserver;

    constructor(private catDataService: CatDataService) {
        this.isLoadingCats$ = this.catDataService.isLoadingCats$;
        this.cats$ = this.catDataService.loadedCats$;
        this.lastCatIntersectionObserver = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
            const lastCat: IntersectionObserverEntry = entries[0];
            if (!lastCat.isIntersecting || this.catDataService.isLoadingCats()) {
                return;
            }
            this.loadMoreCats();
            this.lastCatIntersectionObserver.unobserve(lastCat.target);
        }, { threshold: this.INTERSECTION_THRESHOLD });
    }

    ngAfterViewChecked(): void {
        const lastCatCard: Element | null = document.querySelector('app-cat-card:last-child');
        if (lastCatCard) {
            this.lastCatIntersectionObserver.observe(lastCatCard);
        }
    }

    @HostListener('window:scroll', [])
    onScroll(): void {
        this.shouldShowScrollTopButton = window.scrollY > this.MINIMAL_SCROLL_TO_SHOW_TO_TOP_BUTTON;
    }

    favoritesChanged(cat: Cat): void {
        this.catDataService.favoritesChanged(cat);
    }

    private loadMoreCats(): void {
        this.catDataService.loadMoreCats(this.CAT_NUMBER_PER_LOAD);
    }
}
