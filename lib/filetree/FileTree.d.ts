import { DomNode } from "@common-module/app";
import FileTreeNode, { FileTreeNodeData } from "./FileTreeNode.js";
interface FileTreeOptions {
    id?: string;
    alwaysExpanded?: boolean;
    ContextMenu: new (left: number, top: number, fileTree: FileTree, id: string) => DomNode;
}
export default class FileTree extends DomNode<HTMLUListElement, {
    nodeSelected: (id: string) => void;
    nodeCreated: (parentId: string | undefined, name: string) => void;
}> {
    private options;
    private selectedNodeId;
    children: FileTreeNode[];
    constructor(options: FileTreeOptions, data: FileTreeNodeData[]);
    isAlwaysExpanded(): boolean;
    private findNode;
    add(data: FileTreeNodeData): void;
    add(parentId: string, data: FileTreeNodeData): void;
    openContextMenu(left: number, top: number, id: string): void;
    nodeSelected(id: string): void;
    nodeCreated(parentId: string | undefined, name: string): void;
    createFileNameInput(parentId: string | undefined): void;
}
export {};
//# sourceMappingURL=FileTree.d.ts.map