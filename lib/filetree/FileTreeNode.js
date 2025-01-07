import { DomNode, DomUtils, el } from "@common-module/app";
export default class FileTreeNode extends DomNode {
    tree;
    data;
    expanded = false;
    iconContainer;
    nameContainer;
    childrenContainer;
    constructor(tree, data) {
        super("li.file-tree-node");
        this.tree = tree;
        this.data = data;
        this.append(el("main", data.icon
            ? this.iconContainer = el(".icon-container", data.icon.clone())
            : undefined, this.nameContainer = el(".name", ...(Array.isArray(data.name) ? data.name : [data.name]))));
        if (data.type === "directory") {
            this.childrenContainer = new DomNode("ul.children-container").appendTo(this);
            for (const childData of data.children) {
                this.add(childData);
            }
            this.onDom("click", () => this.expanded ? this.collapse() : this.expand());
        }
        DomUtils.enhanceWithContextMenu(this, (event) => {
            this.tree.openContextMenu(event.clientX, event.clientY, this.data.id, this.data.data);
        });
    }
    expand() {
        this.addClass("expanded");
    }
    collapse() {
        this.removeClass("expanded");
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
}
//# sourceMappingURL=FileTreeNode.js.map