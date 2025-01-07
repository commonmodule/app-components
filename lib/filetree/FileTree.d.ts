import { DomNode } from "@common-module/app";
import FileTreeNode, { FileTreeNodeData } from "./FileTreeNode.js";
interface FileTreeOptions {
    ContextMenu: new (left: number, top: number, id: string) => DomNode;
}
export default class FileTree extends DomNode<HTMLUListElement, {
    nodeSelected: (node: FileTreeNode) => void;
    nodeExpanded: (node: FileTreeNode) => void;
    nodeCollapsed: (node: FileTreeNode) => void;
}> {
    private options;
    children: FileTreeNode[];
    constructor(options: FileTreeOptions, data: FileTreeNodeData[]);
    private findNode;
    add(data: FileTreeNodeData): void;
    add(parentId: string, data: FileTreeNodeData): void;
    openContextMenu(left: number, top: number, id: string): void;
}
export {};
//# sourceMappingURL=FileTree.d.ts.map