import {Injector} from "@angular/core";
import {TreeNodeType} from "./tree-node-type";

export type TreeNode = {
    type: TreeNodeType
    id: string;
    title: string;
    value?: number;
    isHighlighted: boolean;
    children?: TreeNode[];
    injector: Injector;
}