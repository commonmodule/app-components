import { DomChild, DomNode, DomUtils, el } from "@common-module/app";
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
  private expanded = false;

  private iconContainer: DomNode | undefined;
  private nameContainer: DomNode;
  private childrenContainer: DomNode<HTMLUListElement> | undefined;

  constructor(private tree: FileTree, public data: FileTreeNodeData) {
    super("li.file-tree-node");

    this.append(
      data.icon
        ? this.iconContainer = el(".icon-container", data.icon.clone())
        : undefined,
      this.nameContainer = el(
        ".name",
        ...(Array.isArray(data.name) ? data.name : [data.name]),
      ),
    );

    if (data.type === "directory") {
      this.childrenContainer = new DomNode<HTMLUListElement>(
        "ul.children-container",
      ).appendTo(this);

      for (const childData of data.children) {
        this.add(childData);
      }

      this.onDom(
        "click",
        () => this.expanded ? this.collapse() : this.expand(),
      );
    }

    DomUtils.enhanceWithContextMenu(this, (event) => {
      this.tree.openContextMenu(event.clientX, event.clientY, this.data.id);
    });
  }

  private expand(): void {
    this.addClass("expanded");
  }

  private collapse(): void {
    this.removeClass("expanded");
  }

  public findNode(id: string): FileTreeNode | undefined {
    if (this.data.id === id) return this;
    if (this.data.type === "directory") {
      for (const child of this.childrenContainer!.children ?? []) {
        const node = child as FileTreeNode;
        const found = node.findNode(id);
        if (found) return found;
      }
    }
  }

  public add(data: FileTreeNodeData): void {
    if (this.data.type !== "directory") {
      throw new Error("Cannot add child to a file node");
    }
    this.childrenContainer!.append(new FileTreeNode(this.tree, data));
  }
}
