import { Dom } from "@commonmodule/app";
import FileTree from "./FileTree.js";
interface FileTreeNodeBaseData {
    id: string;
    icon?: Dom;
    name: string;
}
export interface FileTreeNodeFileData extends FileTreeNodeBaseData {
    type: "file";
}
interface FileTreeNodeDirectoryData extends FileTreeNodeBaseData {
    type: "directory";
    children: FileTreeNodeData[];
}
export type FileTreeNodeData = FileTreeNodeFileData | FileTreeNodeDirectoryData;
export default class FileTreeNode extends Dom {
    private tree;
    private data;
    private expanded;
    private main;
    private folderToggleIconContainer;
    private iconContainer;
    private nameContainer;
    private childrenContainer;
    constructor(tree: FileTree, data: FileTreeNodeData);
    select(): void;
    getName(): string;
    expand(): void;
    collapse(): void;
    add(data: FileTreeNodeData): void;
    createFileNameInput(): void;
}
export {};
//# sourceMappingURL=FileTreeNode.d.ts.map