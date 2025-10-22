import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, map, distinctUntilChanged} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HighlightService {
    // Maintain a single highlighted id at a time (null means no selection)
    private readonly _selectedId$ = new BehaviorSubject<number | null>(null);

    // Observable that emits whether the provided id is currently highlighted (single-selection)
    public isHighlighted(id: number): Observable<boolean> {
        return this._selectedId$.pipe(
            map(selectedId => selectedId === id),
            distinctUntilChanged()
        );
    }

    // Toggle highlighting: if clicking the same id -> unselect; otherwise select the new id (replacing previous)
    public toggle(id: number): void {
        const current = this._selectedId$.value;
        this._selectedId$.next(current === id ? null : id);
    }

    public clear(): void {
        this._selectedId$.next(null);
    }
}
