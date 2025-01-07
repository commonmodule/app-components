import { DomChild, DomNode } from "@common-module/app";
import FileTree from "./FileTree.js";
interface FileTreeNodeBaseData<Data> {
    id: string;
    icon?: DomNode;
    name: string | DomChild | DomChild[];
    data: Data;
}
interface FileTreeNodeFileData<Data> extends FileTreeNodeBaseData<Data> {
    type: "file";
}
interface FileTreeNodeDirectoryData<Data> extends FileTreeNodeBaseData<Data> {
    type: "directory";
    children: FileTreeNodeData<Data>[];
}
export type FileTreeNodeData<Data> = FileTreeNodeFileData<Data> | FileTreeNodeDirectoryData<Data>;
export default class FileTreeNode<Data> extends DomNode {
    private tree;
    private data;
    private expanded;
    private main;
    private folderToggleIconContainer;
    private iconContainer;
    private nameContainer;
    private childrenContainer;
    constructor(tree: FileTree<Data>, data: FileTreeNodeData<Data>);
    expand(): void;
    collapse(): void;
    findNode(id: string): FileTreeNode<Data> | undefined;
    add(data: FileTreeNodeData<Data>): void;
    createFileNameInput(): void;
}
export {};
//# sourceMappingURL=FileTreeNode.d.ts.map