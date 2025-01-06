import { DomNode } from "@common-module/app";
import FileTreeNode, { FileTreeNodeData } from "./FileTreeNode.js";

export default class FileTree extends DomNode<HTMLUListElement, {
  nodeSelected: (node: FileTreeNode) => void;
  nodeExpanded: (node: FileTreeNode) => void;
  nodeCollapsed: (node: FileTreeNode) => void;
}> {
  public children: FileTreeNode[] = [];

  constructor(data: FileTreeNodeData[]) {
    super("ul.file-tree");
    for (const nodeData of data) {
      this.append(new FileTreeNode(this, nodeData));
    }
  }

  private findNode(id: string): FileTreeNode | undefined {
    for (const node of this.children) {
      const found = node.findNode(id);
      if (found) return found;
    }
  }

  public add(data: FileTreeNodeData): void;
  public add(parentId: string, data: FileTreeNodeData): void;
  public add(
    parentIdOrData: string | FileTreeNodeData,
    dataOrUndefined?: FileTreeNodeData,
  ) {
    let parentId: string | undefined;
    let data: FileTreeNodeData;

    if (typeof parentIdOrData === "string") {
      parentId = parentIdOrData;
      if (!dataOrUndefined) {
        throw new Error("data is required when parentId is provided");
      }
      data = dataOrUndefined;
    } else {
      data = parentIdOrData;
    }

    if (parentId === undefined) {
      this.append(new FileTreeNode(this, data));
    } else {
      const parent = this.findNode(parentId);
      if (!parent) {
        throw new Error(`Parent node with id ${parentId} not found`);
      }
      parent.add(data);
    }
  }
}
