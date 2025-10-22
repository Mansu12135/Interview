import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ColorService {
    /**
     * Generates a random, muted color to avoid overly bright UI accents.
     * Uses HSL with reduced saturation and moderate lightness, then converts to hex.
     */
    public getRandomColor(): string {
        const h = Math.floor(Math.random() * 360); // any hue
        const s = 45; // slightly higher saturation for better contrast on dark bg
        const l = 62; // higher lightness for readable text on dark theme
        return this.hslToHex(h, s, l);
    }

    private hslToHex(h: number, s: number, l: number): string {
        // Convert HSL (0-360, 0-100, 0-100) to hex string #RRGGBB
        s /= 100;
        l /= 100;
        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
        const m = l - c / 2;
        let r = 0, g = 0, b = 0;

        if (0 <= h && h < 60) { r = c; g = x; b = 0; }
        else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
        else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
        else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
        else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
        else { r = c; g = 0; b = x; }

        const toHex = (v: number) => Math.round((v + m) * 255).toString(16).padStart(2, '0');
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }
}
