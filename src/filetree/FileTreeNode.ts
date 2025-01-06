import { DomNode } from "@common-module/app";
import FileTree from "./FileTree.js";

interface FileTreeNodeFileData {
  type: "file";
  icon: string;
  name: string;
}

interface FileTreeNodeDirectoryData {
  type: "directory";
  icon: string;
  name: string;
  children: FileTreeNodeData[];
  expanded: boolean;
}

export type FileTreeNodeData = FileTreeNodeFileData | FileTreeNodeDirectoryData;

export default class FileTreeNode extends DomNode {
  private childrenContainer: DomNode<HTMLUListElement> | undefined;

  constructor(tree: FileTree) {
    super("li.file-tree-node");
  }
}
