import { DomChild, DomNode, DomUtils, el } from "@common-module/app";
import AppCompConfig from "../AppCompConfig.js";
import FileNameInput from "./FileNameInput.js";
import FileTree from "./FileTree.js";

interface FileTreeNodeBaseData<Data> {
  id: string;
  icon?: DomNode;
  name: string | DomChild | DomChild[];
  data: Data;
}

interface FileTreeNodeFileData<Data> extends FileTreeNodeBaseData<Data> {
  type: "file";
}

interface FileTreeNodeDirectoryData<Data> extends FileTreeNodeBaseData<Data> {
  type: "directory";
  children: FileTreeNodeData<Data>[];
}

export type FileTreeNodeData<Data> =
  | FileTreeNodeFileData<Data>
  | FileTreeNodeDirectoryData<Data>;

export default class FileTreeNode<Data> extends DomNode {
  private expanded = false;

  private folderToggleIconContainer: DomNode | undefined;
  private iconContainer: DomNode | undefined;
  private nameContainer: DomNode;
  private childrenContainer: DomNode<HTMLUListElement> | undefined;

  constructor(
    private tree: FileTree<Data>,
    private data: FileTreeNodeData<Data>,
  ) {
    super("li.file-tree-node");

    this.append(
      el(
        "main",
        data.type === "directory"
          ? this.folderToggleIconContainer = el(
            ".icon-container",
            new AppCompConfig.FolderCollapsedIcon(),
          )
          : undefined,
        data.icon
          ? this.iconContainer = el(".icon-container", data.icon.clone())
          : undefined,
        this.nameContainer = el(
          ".name",
          ...(Array.isArray(data.name) ? data.name : [data.name]),
        ),
      ),
    );

    this.onDom(
      "click",
      () => this.tree.emitNodeSelected(data.id, data.data),
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
      this.tree.openContextMenu(
        event.clientX,
        event.clientY,
        this.data.id,
        this.data.data,
      );
    });
  }

  private expand(): void {
    this.expanded = true;
    this.addClass("expanded");
    this.folderToggleIconContainer?.clear().append(
      new AppCompConfig.FolderExpandedIcon(),
    );
  }

  private collapse(): void {
    this.expanded = false;
    this.removeClass("expanded");
    this.folderToggleIconContainer?.clear().append(
      new AppCompConfig.FolderCollapsedIcon(),
    );
  }

  public findNode(id: string): FileTreeNode<Data> | undefined {
    if (this.data.id === id) return this;
    if (this.data.type === "directory") {
      for (const child of this.childrenContainer!.children ?? []) {
        const node = child as FileTreeNode<Data>;
        const found = node.findNode(id);
        if (found) return found;
      }
    }
  }

  public add(data: FileTreeNodeData<Data>): void {
    if (this.data.type !== "directory") {
      throw new Error("Cannot add child to a file node");
    }
    this.childrenContainer!.append(
      new FileTreeNode(this.tree, data),
    );
  }

  public createFileNameInput() {
    new FileNameInput((name) => this.tree.emitNodeCreated(this.data.id, name))
      .appendTo(this);
  }
}
