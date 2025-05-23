import { Dom } from "@commonmodule/app";
import FileTreeNode, { FileTreeNodeData } from "./FileTreeNode.js";
interface FileTreeOptions {
    id?: string;
    alwaysExpanded?: boolean;
    sortByName?: boolean;
    openContextMenu?: (left: number, top: number, id: string) => Dom;
}
export default class FileTree extends Dom<HTMLUListElement, {
    nodeSelected: (id: string) => void;
    nodeCreated: (parentId: string | undefined, name: string) => void;
    nodeRemoved: (id: string) => void;
}> {
    options: FileTreeOptions;
    private selectedNodeId;
    private fileTreeNodeMap;
    constructor(data: FileTreeNodeData[]);
    constructor(options: FileTreeOptions, data: FileTreeNodeData[]);
    setData(data: FileTreeNodeData[]): void;
    isAlwaysExpanded(): boolean;
    private findNode;
    registerNode(id: string, node: FileTreeNode): void;
    add(data: FileTreeNodeData): void;
    add(parentId: string, data: FileTreeNodeData): void;
    removeNode(id: string): void;
    setSelectedNodeId(id: string | undefined): void;
    nodeSelected(id: string): void;
    nodeCreated(parentId: string | undefined, name: string): void;
    createFileNameInput(parentId: string | undefined): void;
    selectNode(id: string): void;
    deselectNode(): void;
    clear(...except: (Dom | undefined)[]): this;
}
export {};
//# sourceMappingURL=FileTree.d.ts.map