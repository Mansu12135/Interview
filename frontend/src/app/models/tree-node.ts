import {Injector} from "@angular/core";
import {TreeNodeType} from "./tree-node-type";

export type TreeNode = {
    type: TreeNodeType
    id: number;
    title: string;
    value?: number;
    isSelected: boolean;
    children?: TreeNode[];
    injector: Injector;
}