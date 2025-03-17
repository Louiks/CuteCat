import { Component } from '@angular/core';
import { TextCardComponent } from "../../../../shared/components/text-card/text-card.component";

@Component({
    selector: 'app-goals-page',
    imports: [TextCardComponent],
    templateUrl: './goals-page.component.html',
    styleUrl: './goals-page.component.scss',
    standalone: true
})
export class GoalsPageComponent {
}
