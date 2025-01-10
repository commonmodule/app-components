import { DomNode } from "@common-module/app";
import FileNameInput from "./FileNameInput.js";
import FileTreeNode from "./FileTreeNode.js";
export default class FileTree extends DomNode {
    options;
    selectedNodeId;
    fileTreeNodeMap = new Map();
    constructor(options, data) {
        super("ul.file-tree");
        this.options = options;
        const processedData = [...data];
        if (this.options.sortByName ?? true) {
            processedData.sort((a, b) => a.name.localeCompare(b.name));
        }
        for (const nodeData of processedData) {
            this.registerNode(nodeData.id, new FileTreeNode(this, nodeData).appendTo(this));
        }
    }
    isAlwaysExpanded() {
        return this.options.alwaysExpanded ?? false;
    }
    findNode(id) {
        return this.fileTreeNodeMap.get(id);
    }
    registerNode(id, node) {
        if (this.fileTreeNodeMap.has(id)) {
            throw new Error(`Node with id ${id} already exists`);
        }
        this.fileTreeNodeMap.set(id, node);
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
            const node = new FileTreeNode(this, data);
            this.registerNode(data.id, node);
            if (this.options.sortByName ?? true) {
                const children = this.children;
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
            }
            else {
                node.appendTo(this);
            }
        }
        else {
            const parent = this.findNode(parentId);
            if (!parent) {
                throw new Error(`Parent node with id ${parentId} not found`);
            }
            parent.add(data);
        }
    }
    removeNode(id) {
        const node = this.findNode(id);
        if (!node) {
            throw new Error(`Node with id ${id} not found`);
        }
        node.remove();
        this.fileTreeNodeMap.delete(id);
        this.emit("nodeRemoved", id);
    }
    setSelectedNodeId(id) {
        if (this.selectedNodeId === id)
            return;
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
    nodeSelected(id) {
        if (this.selectedNodeId === id)
            return;
        this.setSelectedNodeId(id);
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
    selectNode(id) {
        const node = this.findNode(id);
        if (!node) {
            throw new Error(`Node with id ${id} not found`);
        }
        node.select();
    }
}
//# sourceMappingURL=FileTree.js.map