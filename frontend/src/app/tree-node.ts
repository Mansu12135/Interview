import { TreeNodeType } from "./tree-node-type";

export type TreeNode = {
    type: TreeNodeType
    name: string;
    isHighlighted: boolean;
    children?: TreeNode[];
}