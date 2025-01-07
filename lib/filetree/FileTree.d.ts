import { DomNode } from "@common-module/app";
import FileTreeNode, { FileTreeNodeData } from "./FileTreeNode.js";
interface FileTreeOptions<Data> {
    id?: string;
    ContextMenu: new (left: number, top: number, fileTree: FileTree<Data>, id: string, data: Data) => DomNode;
}
export default class FileTree<Data> extends DomNode<HTMLUListElement, {
    nodeSelected: (id: string, data: Data) => void;
    nodeCreated: (parentId: string | undefined, name: string) => void;
}> {
    private options;
    children: FileTreeNode<Data>[];
    constructor(options: FileTreeOptions<Data>, data: FileTreeNodeData<Data>[]);
    private findNode;
    add(data: FileTreeNodeData<Data>): void;
    add(parentId: string, data: FileTreeNodeData<Data>): void;
    openContextMenu(left: number, top: number, id: string, data: Data): void;
    emitNodeSelected(id: string, data: Data): void;
    emitNodeCreated(parentId: string | undefined, name: string): void;
    createFileNameInput(parentId: string | undefined): void;
}
export {};
//# sourceMappingURL=FileTree.d.ts.map