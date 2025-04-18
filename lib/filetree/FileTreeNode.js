import { DomNode, DomUtils, el } from "@commonmodule/app";
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
        this.main.onDom("click", () => this.select());
        if (data.type === "directory") {
            this.childrenContainer = new DomNode("ul.children-container").appendTo(this);
            const processedChildren = [...data.children];
            if (this.tree.options.sortByName) {
                processedChildren.sort((a, b) => a.name.localeCompare(b.name));
            }
            for (const childData of processedChildren) {
                this.add(childData);
            }
            if (this.tree.isAlwaysExpanded()) {
                this.expand();
            }
            else {
                this.main.onDom("click", () => this.expanded ? this.collapse() : this.expand());
            }
        }
        if (this.tree.options.openContextMenu) {
            DomUtils.enhanceWithContextMenu(this.main, (event) => {
                this.tree.options.openContextMenu?.(event.clientX, event.clientY, this.data.id);
            });
        }
    }
    select() {
        this.tree.nodeSelected(this.data.id);
    }
    getName() {
        return this.data.name;
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
    add(data) {
        if (this.data.type !== "directory") {
            throw new Error("Cannot add child to a file node");
        }
        const node = new FileTreeNode(this.tree, data);
        this.tree.registerNode(data.id, node);
        if (this.tree.options.sortByName) {
            const children = this.childrenContainer.children;
            let inserted = false;
            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                if (node.getName().localeCompare(child.getName()) < 0) {
                    node.appendTo(this.childrenContainer, i);
                    inserted = true;
                    break;
                }
            }
            if (!inserted) {
                node.appendTo(this.childrenContainer);
            }
        }
        else {
            node.appendTo(this.childrenContainer);
        }
    }
    createFileNameInput() {
        this.expand();
        new FileNameInput((name) => this.tree.nodeCreated(this.data.id, name))
            .appendTo(this);
    }
}
//# sourceMappingURL=FileTreeNode.js.map