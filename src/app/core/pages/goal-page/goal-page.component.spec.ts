import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalPageComponent } from './goal-page.component';

describe('GoalPageComponent', () => {
    let component: GoalPageComponent;
    let fixture: ComponentFixture<GoalPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [GoalPageComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(GoalPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        // given when then
        expect(component).toBeTruthy();
    });
});
