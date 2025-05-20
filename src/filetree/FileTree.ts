import { Dom } from "@commonmodule/app";
import FileNameInput from "./FileNameInput.js";
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
  public options: FileTreeOptions;

  private selectedNodeId: string | undefined;
  private fileTreeNodeMap = new Map<string, FileTreeNode>();

  constructor(data: FileTreeNodeData[]);
  constructor(options: FileTreeOptions, data: FileTreeNodeData[]);
  constructor(
    dataOrOptions: FileTreeOptions | FileTreeNodeData[],
    dataOrUndefined?: FileTreeNodeData[],
  ) {
    let data: FileTreeNodeData[];
    let options: FileTreeOptions = {};

    if (!Array.isArray(dataOrOptions)) {
      if (dataOrUndefined === undefined) {
        throw new Error("data is required");
      }
      data = dataOrUndefined;
      options = dataOrOptions;
    } else {
      data = dataOrOptions;
    }

    super("ul.file-tree");

    this.options = options;

    this.setData(data);
  }

  public setData(data: FileTreeNodeData[]) {
    this.clear();

    const processedData = [...data];
    if (this.options.sortByName) {
      processedData.sort((a, b) => a.name.localeCompare(b.name));
    }

    for (const nodeData of processedData) {
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
      const node = new FileTreeNode(this, data);
      this.registerNode(data.id, node);

      if (this.options.sortByName) {
        const children = this.children as FileTreeNode[];
        let inserted = false;
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          if (data.name.localeCompare(child.getName()) < 0) {
            node.appendTo(this, i);
            inserted = true;
            break;
          }
        }
        if (!inserted) {
          node.appendTo(this);
        }
      } else {
        node.appendTo(this);
      }
    } else {
      const parent = this.findNode(parentId);
      if (!parent) {
        throw new Error(`Parent node with id ${parentId} not found`);
      }
      parent.add(data);
    }
  }

  public removeNode(id: string) {
    const node = this.findNode(id);
    if (!node) {
      throw new Error(`Node with id ${id} not found`);
    }
    node.remove();
    this.fileTreeNodeMap.delete(id);
    this.emit("nodeRemoved", id);
  }

  public setSelectedNodeId(id: string | undefined) {
    if (this.selectedNodeId === id) return;
    if (this.selectedNodeId) {
      const previousNode = this.findNode(this.selectedNodeId);
      previousNode?.removeClass("selected");
    }
    if (id) {
      const node = this.findNode(id);
      node?.addClass("selected");
    }
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

  public selectNode(id: string) {
    const node = this.findNode(id);
    if (!node) {
      throw new Error(`Node with id ${id} not found`);
    }
    node.select();
  }

  public deselectNode() {
    this.setSelectedNodeId(undefined);
  }

  public clear(...except: (Dom | undefined)[]) {
    this.fileTreeNodeMap.clear();
    return super.clear(...except);
  }
}
