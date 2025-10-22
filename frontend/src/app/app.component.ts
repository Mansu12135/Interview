import {Component, Injector, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BehaviorSubject, combineLatest, EMPTY, map, Observable, of, switchMap, tap} from 'rxjs';
import {TreeNode as TreeNodeDto} from "./dtos/tree-node";
import {TreeNode} from "./models/tree-node";
import {DataProviderService} from "./data-provider.service";
import {TreeNodeType} from "./models/tree-node-type";
import {NodeRendererComponent} from "./components/node-renderer/node-renderer.component";
import {SelectionService} from "./selection.service";
import {ColorService} from "./color.service";
import {COLOR} from "./tokens/color.token";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, NodeRendererComponent, FormsModule],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Tree Viewer';
    tree$: Observable<TreeNode> = EMPTY;
    loading$ = new BehaviorSubject<boolean>(true);
    error$ = new BehaviorSubject<string | null>(null);

    // Extend form model
    extendTitle = '';
    extendValue: number | null = null;
    extending$ = new BehaviorSubject<boolean>(false);

    // Expose selected id to the template
    selectedId$ = this._selection.getSelectedId();

    constructor(
        private readonly _dataProvider: DataProviderService,
        private readonly _selection: SelectionService,
        private readonly _color: ColorService,
        private readonly injector: Injector
    ) {
    }

    ngOnInit(): void {
        const treeDto$: Observable<TreeNodeDto> = this._dataProvider.tree$.pipe(
            tap(() => this.loading$.next(false))
        );
        this.tree$ = treeDto$.pipe(
            switchMap((tree: TreeNodeDto) => this.buildTreeNode$(tree))
        );
    }

    onExtend(selectedId: number | null): void {
        this.error$.next(null);
        const title = this.extendTitle?.trim();
        if (!title) {
            this.error$.next('Title is required');
            return;
        }
        if (this.extendValue === null || this.extendValue === undefined || Number.isNaN(this.extendValue as any)) {
            this.error$.next('Value is required');
            return;
        }

        // Guard: should be disabled in template, but keep a safety check
        if (selectedId === null || selectedId === undefined) {
            this.error$.next('Please select a parent node first.');
            return;
        }

        this.extending$.next(true);
        const payload: any = {title, value: this.extendValue, parentId: selectedId};
        this._dataProvider.extendTree(payload).subscribe({
            next: () => {
                this.extending$.next(false);
                // clear only title by default, keep value for rapid input
                this.extendTitle = '';
            },
            error: (err) => {
                this.extending$.next(false);
                const msg = typeof err?.error === 'string' ? err.error : 'Failed to extend the tree';
                this.error$.next(msg);
            }
        });
    }

    private buildTreeNode$(node: TreeNodeDto): Observable<TreeNode> {
        const childrenDtos: TreeNodeDto[] = node.children ?? [];
        const isNode = !!childrenDtos.length;

        const children$: Observable<TreeNode[]> = isNode
            ? combineLatest(childrenDtos.map((child: TreeNodeDto) => this.buildTreeNode$(child)))
            : of([] as TreeNode[]);

        return combineLatest([this._selection.isSelected(node.id), children$]).pipe(
            map(([isSelected, children]: [boolean, TreeNode[]]) => ({
                id: node.id,
                title: node.title,
                value: node.value,
                type: isNode ? TreeNodeType.Node : TreeNodeType.Leaf,
                isSelected: isSelected,
                children,
                injector: Injector.create({
                    parent: this.injector,
                    providers: [
                        {provide: COLOR, useValue: this._color.getRandomColor()}
                    ]
                })
            }))
        );
    }
}

