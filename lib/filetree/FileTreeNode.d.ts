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
    data: FileTreeNodeData;
    private expanded;
    private iconContainer;
    private nameContainer;
    private childrenContainer;
    constructor(tree: FileTree, data: FileTreeNodeData);
    private expand;
    private collapse;
    findNode(id: string): FileTreeNode | undefined;
    add(data: FileTreeNodeData): void;
}
export {};
//# sourceMappingURL=FileTreeNode.d.ts.map