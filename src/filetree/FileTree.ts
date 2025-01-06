import { DomNode } from "@common-module/app";
import FileTreeNode from "./FileTreeNode.js";

export default class FileTree extends DomNode<HTMLUListElement, {
  nodeSelected: (node: FileTreeNode) => void;
  nodeExpanded: (node: FileTreeNode) => void;
  nodeCollapsed: (node: FileTreeNode) => void;
}> {
  public children: FileTreeNode[] = [];

  constructor() {
    super("ul.file-tree");
  }
}
