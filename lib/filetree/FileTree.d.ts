import { DomNode } from "@common-module/app";
import FileTreeNode, { FileTreeNodeData } from "./FileTreeNode.js";
interface FileTreeOptions<Data> {
    ContextMenu: new (left: number, top: number, id: string, data: Data) => DomNode;
}
export default class FileTree<Data> extends DomNode<HTMLUListElement, {
    nodeSelected: (node: FileTreeNode<Data>) => void;
    nodeExpanded: (node: FileTreeNode<Data>) => void;
    nodeCollapsed: (node: FileTreeNode<Data>) => void;
}> {
    private options;
    children: FileTreeNode<Data>[];
    constructor(options: FileTreeOptions<Data>, data: FileTreeNodeData<Data>[]);
    private findNode;
    add(data: FileTreeNodeData<Data>): void;
    add(parentId: string, data: FileTreeNodeData<Data>): void;
    openContextMenu(left: number, top: number, id: string, data: Data): void;
}
export {};
//# sourceMappingURL=FileTree.d.ts.map