import { DomNode } from "@common-module/app";
import FileTreeNode, { FileTreeNodeData } from "./FileTreeNode.js";

interface FileTreeOptions<Data> {
  ContextMenu: new (
    left: number,
    top: number,
    id: string,
    data: Data,
  ) => DomNode;
}

export default class FileTree<Data> extends DomNode<HTMLUListElement, {
  nodeSelected: (node: FileTreeNode<Data>) => void;
  nodeExpanded: (node: FileTreeNode<Data>) => void;
  nodeCollapsed: (node: FileTreeNode<Data>) => void;
}> {
  public children: FileTreeNode<Data>[] = [];

  constructor(
    private options: FileTreeOptions<Data>,
    data: FileTreeNodeData<Data>[],
  ) {
    super("ul.file-tree");
    for (const nodeData of data) {
      this.append(new FileTreeNode(this, nodeData));
    }
  }

  private findNode(id: string): FileTreeNode<Data> | undefined {
    for (const node of this.children) {
      const found = node.findNode(id);
      if (found) return found;
    }
  }

  public add(data: FileTreeNodeData<Data>): void;
  public add(parentId: string, data: FileTreeNodeData<Data>): void;
  public add(
    parentIdOrData: string | FileTreeNodeData<Data>,
    dataOrUndefined?: FileTreeNodeData<Data>,
  ) {
    let parentId: string | undefined;
    let data: FileTreeNodeData<Data>;

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

  public openContextMenu(
    left: number,
    top: number,
    id: string,
    data: Data,
  ): void {
    new this.options.ContextMenu(left, top, id, data);
  }
}
