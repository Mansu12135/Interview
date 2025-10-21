import {Component, Input} from '@angular/core';
import {TreeNode} from "../../tree-node";
import {NgTemplateOutlet} from "@angular/common";
import {TreeNodeType} from "../../tree-node-type";
import {HighlightService} from "../../highlight.service";
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

    constructor(private readonly _highlight: HighlightService) {
    }

    toggleNodeHighlighting(name: string, e: PointerEvent) {
        this._highlight.toggle(name);
        e.stopPropagation();
    }
}
