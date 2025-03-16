import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatsPageComponent } from './cats-page.component';
import { CatDataService } from '../../../../shared/services/cat-data.service';
import { of } from 'rxjs';
import { Cat } from '../../../../shared/models/cat.model';

describe('CatsPageComponent', () => {
    let component: CatsPageComponent;
    let fixture: ComponentFixture<CatsPageComponent>;
    let catDataService: jasmine.SpyObj<CatDataService>;

    beforeEach(async () => {
        const catDataServiceSpy = jasmine.createSpyObj('CatDataService', ['loadMoreCats', 'favoritesChanged'], {
            loadedCats$: of([]),
        });

        await TestBed.configureTestingModule({
            imports: [CatsPageComponent],
            providers: [
                { provide: CatDataService, useValue: catDataServiceSpy },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(CatsPageComponent);
        component = fixture.componentInstance;
        catDataService = TestBed.inject(CatDataService) as jasmine.SpyObj<CatDataService>;

        fixture.detectChanges();
    });

    it('should create', () => {
        // given when then
        expect(component).toBeTruthy();
    });

    it('should set shouldShowScrollTopButton to true when scrolled past threshold', () => {
        // given
        window['scrollY'] = component['MINIMAL_SCROLL_TO_SHOW_TO_TOP_BUTTON'] + 1;

        // when
        component.onScroll();

        // then
        expect(component.shouldShowScrollTopButton).toBeTrue();
    });

    it('should set shouldShowScrollTopButton to false when scrolled above threshold', () => {
        // given
        window['scrollY'] = component['MINIMAL_SCROLL_TO_SHOW_TO_TOP_BUTTON'] - 1;

        // when
        component.onScroll();

        // then
        expect(component.shouldShowScrollTopButton).toBeFalse();
    });

    it('should call favoritesChanged on catDataService when favoritesChanged is called', () => {
        // given
        const cat: Cat = { name: 'Test Cat', description: '', imageUrl: '', likes: 0, isFavorite: false };

        // when
        component.favoritesChanged(cat);

        // then
        expect(catDataService.favoritesChanged).toHaveBeenCalledWith(cat);
    });

    it('should observe the last cat card after view checked', () => {
        // given
        spyOn(component['lastCatIntersectionObserver'], 'observe');
        const lastCatCard: HTMLElement = document.createElement('div');
        spyOn(document, 'querySelector').and.returnValue(lastCatCard);

        // when
        component.ngAfterViewChecked();

        // then
        expect(component['lastCatIntersectionObserver'].observe).toHaveBeenCalledWith(lastCatCard);
    });
});