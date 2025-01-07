import { DomNode } from "@common-module/app";
import FileNameInput from "./FileNameInput.js";
import FileTreeNode from "./FileTreeNode.js";
export default class FileTree extends DomNode {
    options;
    selectedNodeId;
    children = [];
    constructor(options, data) {
        super("ul.file-tree");
        this.options = options;
        for (const nodeData of data) {
            this.append(new FileTreeNode(this, nodeData));
        }
    }
    isAlwaysExpanded() {
        return this.options.alwaysExpanded ?? false;
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
            new FileTreeNode(this, data).appendTo(this);
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
        new this.options.ContextMenu(left, top, this, id);
    }
    nodeSelected(id) {
        if (this.selectedNodeId === id)
            return;
        if (this.selectedNodeId) {
            const previousNode = this.findNode(this.selectedNodeId);
            previousNode?.removeClass("selected");
        }
        const node = this.findNode(id);
        node?.addClass("selected");
        this.selectedNodeId = id;
        this.emit("nodeSelected", id);
    }
    nodeCreated(parentId, name) {
        this.emit("nodeCreated", parentId, name);
    }
    createFileNameInput(parentId) {
        if (parentId === undefined) {
            new FileNameInput((name) => this.nodeCreated(parentId, name)).appendTo(this);
        }
        else {
            const parent = this.findNode(parentId);
            if (!parent) {
                throw new Error(`Parent node with id ${parentId} not found`);
            }
            parent.createFileNameInput();
        }
    }
}
//# sourceMappingURL=FileTree.js.map