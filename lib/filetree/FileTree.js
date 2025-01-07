import { DomNode } from "@common-module/app";
import FileNameInput from "./FileNameInput.js";
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
    openContextMenu(left, top, id, data) {
        new this.options.ContextMenu(left, top, this, id, data);
    }
    emitNodeSelected(id, data) {
        this.emit("nodeSelected", id, data);
    }
    emitNodeCreated(parentId, name) {
        this.emit("nodeCreated", parentId, name);
    }
    createFileNameInput(parentId) {
        if (parentId === undefined) {
            new FileNameInput((name) => this.emitNodeCreated(parentId, name))
                .appendTo(this);
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