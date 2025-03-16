import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CatDataService } from "../../services/cat-data.service";
import { MatIcon } from '@angular/material/icon'
import { MatIconButton } from "@angular/material/button";
import { MatRipple } from "@angular/material/core";
import { Cat } from "../../models/cat.model";

@Component({
    selector: 'app-cat-card',
    imports: [
        MatIcon,
        MatIconButton,
        MatRipple,
    ],
    providers: [CatDataService],
    templateUrl: './cat-card.component.html',
    standalone: true,
    styleUrl: './cat-card.component.scss'
})
export class CatCardComponent {

    @Input() catData!: Cat;
    @Output() favoritesChanged: EventEmitter<void> = new EventEmitter<void>();
    
    readonly MAT_RIPPLE_COLOR_DARK: string = "rgba(0, 0, 0, 0.2)";
    readonly MAT_RIPPLE_COLOR_LIGHT: string = "rgba(255, 255, 255, 0.2)";

    favoritesClicked(): void {
        this.favoritesChanged.emit();
    }
}
