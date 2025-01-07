import { DomNode, DomUtils, el } from "@common-module/app";
import AppCompConfig from "../AppCompConfig.js";
import FileNameInput from "./FileNameInput.js";
export default class FileTreeNode extends DomNode {
    tree;
    data;
    expanded = false;
    main;
    folderToggleIconContainer;
    iconContainer;
    nameContainer;
    childrenContainer;
    constructor(tree, data) {
        super("li.file-tree-node");
        this.tree = tree;
        this.data = data;
        this.append(this.main = el("main", data.type === "directory"
            ? this.folderToggleIconContainer = el(".icon-container", new AppCompConfig.FolderCollapsedIcon())
            : undefined, data.icon
            ? this.iconContainer = el(".icon-container", data.icon.clone())
            : undefined, this.nameContainer = el(".name", ...(Array.isArray(data.name) ? data.name : [data.name]))));
        this.main.onDom("click", () => this.tree.emitNodeSelected(data.id, data.data));
        if (data.type === "directory") {
            this.childrenContainer = new DomNode("ul.children-container").appendTo(this);
            for (const childData of data.children) {
                this.add(childData);
            }
            this.main.onDom("click", () => this.expanded ? this.collapse() : this.expand());
        }
        DomUtils.enhanceWithContextMenu(this, (event) => {
            this.tree.openContextMenu(event.clientX, event.clientY, this.data.id, this.data.data);
        });
    }
    expand() {
        this.expanded = true;
        this.addClass("expanded");
        this.folderToggleIconContainer?.clear().append(new AppCompConfig.FolderExpandedIcon());
    }
    collapse() {
        this.expanded = false;
        this.removeClass("expanded");
        this.folderToggleIconContainer?.clear().append(new AppCompConfig.FolderCollapsedIcon());
    }
    findNode(id) {
        if (this.data.id === id)
            return this;
        if (this.data.type === "directory") {
            for (const child of this.childrenContainer.children ?? []) {
                const node = child;
                const found = node.findNode(id);
                if (found)
                    return found;
            }
        }
    }
    add(data) {
        if (this.data.type !== "directory") {
            throw new Error("Cannot add child to a file node");
        }
        this.childrenContainer.append(new FileTreeNode(this.tree, data));
    }
    createFileNameInput() {
        this.expand();
        new FileNameInput((name) => this.tree.emitNodeCreated(this.data.id, name))
            .appendTo(this);
    }
}
//# sourceMappingURL=FileTreeNode.js.map