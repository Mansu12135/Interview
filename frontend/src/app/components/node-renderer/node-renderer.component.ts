import { Component, Input } from '@angular/core';
import { TreeNode } from "../../tree-node";
import { NgTemplateOutlet } from "@angular/common";
import { TreeNodeType } from "../../tree-node-type";

@Component({
    selector: 'node-renderer',
    standalone: true,
    imports: [
        NgTemplateOutlet
    ],
    templateUrl: './node-renderer.component.html',
    styleUrl: './node-renderer.component.css'
})
export class NodeRendererComponent {
    @Input() public tree!: TreeNode;

    protected readonly TreeNodeType = TreeNodeType;
}
