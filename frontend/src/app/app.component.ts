import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, combineLatest, EMPTY, map, Observable } from 'rxjs';
import { TreeNode as TreeNodeDto } from "./models/tree-node";
import { DataProviderService } from "./data-provider.service";
import { TreeNode } from "./tree-node";
import { TreeNodeType } from "./tree-node-type";
import { NodeRendererComponent } from "./components/node-renderer/node-renderer.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, NodeRendererComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    private readonly _highlightedNodesSubject$: BehaviorSubject<Set<string>> = new BehaviorSubject<Set<string>>(new Set<string>());

    title = 'Tree Viewer';

    tree$: Observable<TreeNode> = EMPTY;
    loading$ = new BehaviorSubject<boolean>(true);
    error$ = new BehaviorSubject<string | null>(null);

    constructor(private readonly _dataProvider: DataProviderService) {}

    ngOnInit(): void {
        const tree$: Observable<TreeNodeDto> = this._dataProvider.tree$;
        this.tree$ = combineLatest([tree$, this._highlightedNodesSubject$])
            .pipe(map(([tree, highlightedNodes]: [TreeNodeDto, Set<string>]) => this.buildTreeNode(tree, highlightedNodes)))
    }

    protected nodeClicked(name: string): void {
        const highlightedNodes: Set<string> = this._highlightedNodesSubject$.value;
        if (highlightedNodes.delete(name)) {
            return;
        }
        highlightedNodes.add(name);
    }

    private buildTreeNode(node: TreeNodeDto, highlightedNodes: Set<string>): TreeNode {
        return {
            name: node.name,
            type: node.children?.length ? TreeNodeType.Node : TreeNodeType.Leaf,
            isHighlighted: highlightedNodes.has(node.name),
            children: node.children?.map((child: TreeNodeDto) => this.buildTreeNode(child, highlightedNodes))
        }
    }
}

