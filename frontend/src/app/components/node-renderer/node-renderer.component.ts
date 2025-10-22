import {Component, Input} from '@angular/core';
import {TreeNode} from "../../models/tree-node";
import {NgTemplateOutlet} from "@angular/common";
import {TreeNodeType} from "../../models/tree-node-type";
import {SelectionService} from "../../selection.service";
import {ColoredContent} from "../colored-content/colored-content";

@Component({
    selector: 'node-renderer',
    standalone: true,
    imports: [
        NgTemplateOutlet,
        ColoredContent
    ],
    templateUrl: './node-renderer.component.html',
    styleUrl: './node-renderer.component.css'
})
export class NodeRendererComponent {
    @Input() public tree!: TreeNode;

    protected readonly TreeNodeType = TreeNodeType;

    constructor(private readonly _selection: SelectionService) {
    }

    toggleNodeSelecting(id: number, e: PointerEvent) {
        this._selection.toggle(id);
        e.stopPropagation();
    }
}
