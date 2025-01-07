import { DomChild, DomNode } from "@common-module/app";
import FileTree from "./FileTree.js";
interface FileTreeNodeBaseData {
    id: string;
    icon?: DomNode;
    name: string | DomChild | DomChild[];
}
interface FileTreeNodeFileData extends FileTreeNodeBaseData {
    type: "file";
}
interface FileTreeNodeDirectoryData extends FileTreeNodeBaseData {
    type: "directory";
    children: FileTreeNodeData[];
}
export type FileTreeNodeData = FileTreeNodeFileData | FileTreeNodeDirectoryData;
export default class FileTreeNode extends DomNode {
    private tree;
    private data;
    private expanded;
    private main;
    private folderToggleIconContainer;
    private iconContainer;
    private nameContainer;
    private childrenContainer;
    constructor(tree: FileTree, data: FileTreeNodeData);
    expand(): void;
    collapse(): void;
    findNode(id: string): FileTreeNode | undefined;
    add(data: FileTreeNodeData): void;
    createFileNameInput(): void;
}
export {};
//# sourceMappingURL=FileTreeNode.d.ts.map