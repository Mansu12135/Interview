import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, catchError, delay, finalize, Observable, of, shareReplay} from 'rxjs';
import {TreeNode} from './models/tree-node';
import {TreeNodeComponent} from './tree-node/tree-node.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, TreeNodeComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Tree Viewer';

    tree$!: Observable<TreeNode | null>;
    loading$ = new BehaviorSubject<boolean>(true);
    error$ = new BehaviorSubject<string | null>(null);

    constructor(private http: HttpClient) {
    }

    ngOnInit(): void {
        const url = 'http://localhost:5000/api/tree';
        this.tree$ = this.http.get<TreeNode>(url).pipe(
            delay(1000),
            shareReplay(1),
            finalize(() => this.loading$.next(false)),
            catchError(err => {
                console.error(err);
                this.error$.next('Failed to load tree');
                return of(null);
            })
        );
    }
}
