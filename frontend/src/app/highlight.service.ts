import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HighlightService {
    private readonly _highlightedNodesSubject$ = new BehaviorSubject<Set<string>>(new Set<string>());

    // Check whether a node is currently highlighted
    public isHighlighted(name: string): boolean {
        return this._highlightedNodesSubject$.value.has(name);
    }

    public toggle(name: string): void {
        const current = this._highlightedNodesSubject$.value;
        const next = new Set(current);
        if (next.has(name)) {
            next.delete(name);
        } else {
            next.add(name);
        }
        this._highlightedNodesSubject$.next(next);
    }

    public clear(): void {
        this._highlightedNodesSubject$.next(new Set<string>());
    }
}
