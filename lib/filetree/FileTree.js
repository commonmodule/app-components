import { DomNode } from "@common-module/app";
import FileTreeNode from "./FileTreeNode.js";
export default class FileTree extends DomNode {
    options;
    children = [];
    constructor(options, data) {
        super("ul.file-tree");
        this.options = options;
        for (const nodeData of data) {
            this.append(new FileTreeNode(this, nodeData));
        }
    }
    findNode(id) {
        for (const node of this.children) {
            const found = node.findNode(id);
            if (found)
                return found;
        }
    }
    add(parentIdOrData, dataOrUndefined) {
        let parentId;
        let data;
        if (typeof parentIdOrData === "string") {
            parentId = parentIdOrData;
            if (!dataOrUndefined) {
                throw new Error("data is required when parentId is provided");
            }
            data = dataOrUndefined;
        }
        else {
            data = parentIdOrData;
        }
        if (parentId === undefined) {
            this.append(new FileTreeNode(this, data));
        }
        else {
            const parent = this.findNode(parentId);
            if (!parent) {
                throw new Error(`Parent node with id ${parentId} not found`);
            }
            parent.add(data);
        }
    }
    openContextMenu(left, top, id) {
        new this.options.ContextMenu(left, top, id);
    }
}
//# sourceMappingURL=FileTree.js.map