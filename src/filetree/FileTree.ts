import { DomNode } from "@common-module/app";
import FileNameInput from "./FileNameInput.js";
import FileTreeNode, { FileTreeNodeData } from "./FileTreeNode.js";

interface FileTreeOptions {
  id?: string;
  alwaysExpanded?: boolean;
  ContextMenu: new (
    left: number,
    top: number,
    fileTree: FileTree,
    id: string,
  ) => DomNode;
}

export default class FileTree extends DomNode<HTMLUListElement, {
  nodeSelected: (id: string) => void;
  nodeCreated: (parentId: string | undefined, name: string) => void;
}> {
  private selectedNodeId: string | undefined;
  private fileTreeNodeMap = new Map<string, FileTreeNode>();

  constructor(
    private options: FileTreeOptions,
    data: FileTreeNodeData[],
  ) {
    super("ul.file-tree");
    for (const nodeData of data) {
      this.registerNode(
        nodeData.id,
        new FileTreeNode(this, nodeData).appendTo(this),
      );
    }
  }

  public isAlwaysExpanded(): boolean {
    return this.options.alwaysExpanded ?? false;
  }

  private findNode(id: string): FileTreeNode | undefined {
    return this.fileTreeNodeMap.get(id);
  }

  public registerNode(id: string, node: FileTreeNode) {
    if (this.fileTreeNodeMap.has(id)) {
      throw new Error(`Node with id ${id} already exists`);
    }
    this.fileTreeNodeMap.set(id, node);
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
      this.registerNode(data.id, new FileTreeNode(this, data).appendTo(this));
    } else {
      const parent = this.findNode(parentId);
      if (!parent) {
        throw new Error(`Parent node with id ${parentId} not found`);
      }
      parent.add(data);
    }
  }

  public openContextMenu(left: number, top: number, id: string): void {
    new this.options.ContextMenu(left, top, this, id);
  }

  public setSelectedNodeId(id: string) {
    if (this.selectedNodeId === id) return;
    if (this.selectedNodeId) {
      const previousNode = this.findNode(this.selectedNodeId);
      previousNode?.removeClass("selected");
    }
    const node = this.findNode(id);
    node?.addClass("selected");
    this.selectedNodeId = id;
  }

  public nodeSelected(id: string) {
    if (this.selectedNodeId === id) return;
    this.setSelectedNodeId(id);
    this.emit("nodeSelected", id);
  }

  public nodeCreated(parentId: string | undefined, name: string) {
    this.emit("nodeCreated", parentId, name);
  }

  public createFileNameInput(parentId: string | undefined) {
    if (parentId === undefined) {
      new FileNameInput((name) => this.nodeCreated(parentId, name)).appendTo(
        this,
      );
    } else {
      const parent = this.findNode(parentId);
      if (!parent) {
        throw new Error(`Parent node with id ${parentId} not found`);
      }
      parent.createFileNameInput();
    }
  }
}
