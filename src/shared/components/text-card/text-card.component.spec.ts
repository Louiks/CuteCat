import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextCardComponent } from './text-card.component';
import { Component } from '@angular/core';

@Component({
    imports: [TextCardComponent],
    standalone: true,
    template: `
        <app-text-card><p class="test-content">Test Content</p></app-text-card>`
})
class TestHostComponent {
}

describe('TextCardComponent', () => {
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TextCardComponent, TestHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });

    it('should project content', () => {
        // given

        // when
        const projectedContent = fixture.nativeElement.querySelector('.test-content');

        // then
        expect(projectedContent).toBeTruthy();
        expect(projectedContent.textContent).toBe('Test Content');
    });
});