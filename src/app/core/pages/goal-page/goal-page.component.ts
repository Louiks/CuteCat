import { Component } from '@angular/core';
import { TextCardComponent } from "../../../../shared/components/text-card/text-card.component";

@Component({
    selector: 'app-goal-page',
    imports: [TextCardComponent],
    templateUrl: './goal-page.component.html',
    styleUrl: './goal-page.component.scss',
    standalone: true
})
export class GoalPageComponent {
}
