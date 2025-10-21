import {Component, Injector, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BehaviorSubject, combineLatest, EMPTY, finalize, map, Observable} from 'rxjs';
import {TreeNode as TreeNodeDto} from "./models/tree-node";
import {DataProviderService} from "./data-provider.service";
import {TreeNode} from "./tree-node";
import {TreeNodeType} from "./tree-node-type";
import {NodeRendererComponent} from "./components/node-renderer/node-renderer.component";
import {HighlightService} from "./highlight.service";
import {ColorService} from "./color.service";
import { COLOR } from "./tokens/color.token";

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
        const tree$: Observable<TreeNodeDto> = this._dataProvider.tree$.pipe(finalize(() => this.loading$.next(false)));
        this.tree$ = combineLatest([tree$, this._highlight.highlightedNodes$])
            .pipe(map(([tree, highlightedNodes]: [TreeNodeDto, Set<string>]) => this.buildTreeNode(tree, highlightedNodes)))
    }

    private buildTreeNode(node: TreeNodeDto, highlightedNodes: Set<string>): TreeNode {
        return {
            name: node.name,
            type: node.children?.length ? TreeNodeType.Node : TreeNodeType.Leaf,
            isHighlighted: highlightedNodes.has(node.name),
            children: node.children?.map((child: TreeNodeDto) => this.buildTreeNode(child, highlightedNodes)),
            injector: Injector.create({
                parent: this.injector,
                providers: [
                    { provide: COLOR, useValue: this._color.getRandomColor() }
                ]
            })
        }
    }
}

