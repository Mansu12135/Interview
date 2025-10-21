import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ColorService {
    /**
     * Generates a random hex color in the form #RRGGBB.
     * Example: #3fa7d6
     */
    public getRandomColor(): string {
        const value = Math.floor(Math.random() * 0xffffff);
        return `#${value.toString(16).padStart(6, '0')}`;
    }
}
