import { DomNode } from "@common-module/app";
import FileTree from "./FileTree.js";
interface FileTreeNodeBaseData {
    id: string;
    icon?: DomNode;
    name: string;
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
    getName(): string;
    expand(): void;
    collapse(): void;
    add(data: FileTreeNodeData): void;
    createFileNameInput(): void;
}
export {};
//# sourceMappingURL=FileTreeNode.d.ts.map