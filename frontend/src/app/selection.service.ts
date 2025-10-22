import {Injectable} from '@angular/core';
import {BehaviorSubject, distinctUntilChanged, map, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SelectionService {
    // Maintain a single selected id at a time (null means no selection)
    private readonly _selectedId$ = new BehaviorSubject<number | null>(null);

    // Observable that emits whether the provided id is currently selected (single-selection)
    public isSelected(id: number): Observable<boolean> {
        return this._selectedId$.pipe(
            map(selectedId => selectedId === id),
            distinctUntilChanged()
        );
    }

    // Toggle selection: if clicking the same id -> unselect; otherwise select the new id (replacing previous)
    public toggle(id: number): void {
        const current = this._selectedId$.value;
        this._selectedId$.next(current === id ? null : id);
    }

    public getSelectedId(): Observable<number | null> {
        return this._selectedId$.asObservable().pipe(distinctUntilChanged());
    }

    public clear(): void {
        this._selectedId$.next(null);
    }
}
