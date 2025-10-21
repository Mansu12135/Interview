import {Component, HostBinding, inject} from '@angular/core';
import {COLOR} from "../../tokens/color.token";

@Component({
    selector: 'colored-content',
    imports: [],
    templateUrl: './colored-content.html',
    styleUrl: './colored-content.css'
})
export class ColoredContent {
    @HostBinding('style.color')
    public color = inject(COLOR);
}
