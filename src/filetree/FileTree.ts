import { DomNode } from "@common-module/app";
import FileNameInput from "./FileNameInput.js";
import FileTreeNode, { FileTreeNodeData } from "./FileTreeNode.js";

interface FileTreeOptions<Data> {
  id?: string;
  ContextMenu: new (
    left: number,
    top: number,
    fileTree: FileTree<Data>,
    id: string,
    data: Data,
  ) => DomNode;
}

export default class FileTree<Data> extends DomNode<HTMLUListElement, {
  nodeSelected: (id: string, data: Data) => void;
  nodeCreated: (parentId: string | undefined, name: string) => void;
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
      new FileTreeNode(this, data).appendTo(this);
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
    new this.options.ContextMenu(left, top, this, id, data);
  }

  public emitNodeSelected(id: string, data: Data) {
    this.emit("nodeSelected", id, data);
  }

  public emitNodeCreated(parentId: string | undefined, name: string) {
    this.emit("nodeCreated", parentId, name);
  }

  public createFileNameInput(parentId: string | undefined) {
    if (parentId === undefined) {
      new FileNameInput((name) => this.emitNodeCreated(parentId, name))
        .appendTo(this);
    } else {
      const parent = this.findNode(parentId);
      if (!parent) {
        throw new Error(`Parent node with id ${parentId} not found`);
      }
      parent.createFileNameInput();
    }
  }
}
