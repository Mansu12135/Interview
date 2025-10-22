import {Component, Injector, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BehaviorSubject, combineLatest, EMPTY, finalize, map, Observable, of, switchMap} from 'rxjs';
import {TreeNode as TreeNodeDto} from "./dtos/tree-node";
import {TreeNode} from "./models/tree-node";
import {DataProviderService} from "./data-provider.service";
import {TreeNodeType} from "./models/tree-node-type";
import {NodeRendererComponent} from "./components/node-renderer/node-renderer.component";
import {HighlightService} from "./highlight.service";
import {ColorService} from "./color.service";
import {COLOR} from "./tokens/color.token";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, NodeRendererComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Tree Viewer';
    tree$: Observable<TreeNode> = EMPTY;
    loading$ = new BehaviorSubject<boolean>(true);
    error$ = new BehaviorSubject<string | null>(null);

    constructor(
        private readonly _dataProvider: DataProviderService,
        private readonly _highlight: HighlightService,
        private readonly _color: ColorService,
        private readonly injector: Injector
    ) {
    }

    ngOnInit(): void {
        const treeDto$: Observable<TreeNodeDto> = this._dataProvider.tree$.pipe(finalize(() => this.loading$.next(false)));
        this.tree$ = treeDto$.pipe(
            switchMap((tree: TreeNodeDto) => this.buildTreeNode$(tree))
        );
    }

    private buildTreeNode$(node: TreeNodeDto): Observable<TreeNode> {
        const childrenDtos: TreeNodeDto[] = node.children ?? [];
        const isNode = !!childrenDtos.length;

        const children$: Observable<TreeNode[]> = isNode
            ? combineLatest(childrenDtos.map((child: TreeNodeDto) => this.buildTreeNode$(child)))
            : of([] as TreeNode[]);

        return combineLatest([this._highlight.isHighlighted(node.name), children$]).pipe(
            map(([isHighlighted, children]: [boolean, TreeNode[]]) => ({
                name: node.name,
                type: isNode ? TreeNodeType.Node : TreeNodeType.Leaf,
                isHighlighted,
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

