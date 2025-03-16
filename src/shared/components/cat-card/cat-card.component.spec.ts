import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatCardComponent } from './cat-card.component';
import { CatDataService } from '../../services/cat-data.service';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatRipple } from '@angular/material/core';
import { Cat } from '../../models/cat.model';

describe('CatCardComponent', () => {
    let component: CatCardComponent;
    let fixture: ComponentFixture<CatCardComponent>;
    const cat: Cat = { name: 'Test Cat', description: '', imageUrl: '', likes: 0, isFavorite: false };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MatIcon, MatIconButton, MatRipple, CatCardComponent],
            declarations: [],
            providers: [CatDataService]
        }).compileComponents();

        fixture = TestBed.createComponent(CatCardComponent);
        component = fixture.componentInstance;
        component.catData = cat;
        fixture.detectChanges();
    });

    it('should create', () => {
        // given when then
        expect(component).toBeTruthy();
    });

    it('should emit favoritesChanged event when favoritesClicked is called', () => {
        // given
        spyOn(component.favoritesChanged, 'emit');

        // when
        component.favoritesClicked();

        // then
        expect(component.favoritesChanged.emit).toHaveBeenCalled();
    });

    it('should have correct ripple color constants', () => {
        // given when then
        expect(component.MAT_RIPPLE_COLOR_DARK).toBe('rgba(0, 0, 0, 0.2)');
        expect(component.MAT_RIPPLE_COLOR_LIGHT).toBe('rgba(255, 255, 255, 0.2)');
    });

    it('should have catData input', () => {
        // given when then
        expect(component.catData).toBe(cat);
    });
});