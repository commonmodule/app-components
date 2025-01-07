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
    data: FileTreeNodeData<Data>;
    private expanded;
    private iconContainer;
    private nameContainer;
    private childrenContainer;
    constructor(tree: FileTree<Data>, data: FileTreeNodeData<Data>);
    private expand;
    private collapse;
    findNode(id: string): FileTreeNode<Data> | undefined;
    add(data: FileTreeNodeData<Data>): void;
}
export {};
//# sourceMappingURL=FileTreeNode.d.ts.map