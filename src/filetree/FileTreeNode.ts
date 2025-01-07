import { DomChild, DomNode, DomUtils, el } from "@common-module/app";
import AppCompConfig from "../AppCompConfig.js";
import FileNameInput from "./FileNameInput.js";
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

export type FileTreeNodeData =
  | FileTreeNodeFileData
  | FileTreeNodeDirectoryData;

export default class FileTreeNode extends DomNode {
  private expanded = false;

  private main: DomNode;
  private folderToggleIconContainer: DomNode | undefined;
  private iconContainer: DomNode | undefined;
  private nameContainer: DomNode;
  private childrenContainer: DomNode<HTMLUListElement> | undefined;

  constructor(
    private tree: FileTree,
    private data: FileTreeNodeData,
  ) {
    super("li.file-tree-node");

    this.append(
      this.main = el(
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

    this.main.onDom("click", () => this.tree.nodeSelected(data.id));

    if (data.type === "directory") {
      this.childrenContainer = new DomNode<HTMLUListElement>(
        "ul.children-container",
      ).appendTo(this);

      for (const childData of data.children) {
        this.add(childData);
      }

      if (this.tree.isAlwaysExpanded()) {
        this.expand();
      } else {
        this.main.onDom(
          "click",
          () => this.expanded ? this.collapse() : this.expand(),
        );
      }
    }

    DomUtils.enhanceWithContextMenu(this.main, (event) => {
      this.tree.openContextMenu(event.clientX, event.clientY, this.data.id);
    });
  }

  public expand(): void {
    this.expanded = true;
    this.addClass("expanded");
    this.folderToggleIconContainer?.clear().append(
      new AppCompConfig.FolderExpandedIcon(),
    );
  }

  public collapse(): void {
    this.expanded = false;
    this.removeClass("expanded");
    this.folderToggleIconContainer?.clear().append(
      new AppCompConfig.FolderCollapsedIcon(),
    );
  }

  public add(data: FileTreeNodeData): void {
    if (this.data.type !== "directory") {
      throw new Error("Cannot add child to a file node");
    }
    const node = new FileTreeNode(this.tree, data);
    this.tree.registerNode(data.id, node);
    this.childrenContainer!.append(node);
  }

  public createFileNameInput() {
    this.expand();
    new FileNameInput((name) => this.tree.nodeCreated(this.data.id, name))
      .appendTo(this);
  }
}
