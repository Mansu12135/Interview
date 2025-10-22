import {Component, Injector, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BehaviorSubject, EMPTY, finalize, map, Observable} from 'rxjs';
import {TreeNode as TreeNodeDto, TreeNode} from "./models/tree-node";
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
        const tree$: Observable<TreeNodeDto> = this._dataProvider.tree$.pipe(finalize(() => this.loading$.next(false)));
        this.tree$ = tree$
            .pipe(map((tree: TreeNode) => this.buildTreeNode(tree)))
    }

    private buildTreeNode(node: TreeNodeDto): TreeNode {
        return {
            name: node.name,
            type: node.children?.length ? TreeNodeType.Node : TreeNodeType.Leaf,
            isHighlighted: this._highlight.isHighlighted(node.name),
            children: node.children?.map((child: TreeNodeDto) => this.buildTreeNode(child)),
            injector: Injector.create({
                parent: this.injector,
                providers: [
                    {provide: COLOR, useValue: this._color.getRandomColor()}
                ]
            })
        }
    }
}

