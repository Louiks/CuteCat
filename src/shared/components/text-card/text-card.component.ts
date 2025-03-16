import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-text-card',
    templateUrl: './text-card.component.html',
    styleUrls: ['./text-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class TextCardComponent {
}
