import { Component } from '@angular/core';
import { TextCardComponent } from "../../../../shared/components/text-card/text-card.component";

@Component({
    selector: 'app-credits-page',
    imports: [TextCardComponent],
    templateUrl: './credits-page.component.html',
    styleUrl: './credits-page.component.scss',
    standalone: true
})
export class CreditsPageComponent {
}
