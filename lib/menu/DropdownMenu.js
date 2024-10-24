import { BodyNode, DomNode, el } from "@common-module/app";
export default class DropdownMenu extends DomNode {
    options;
    header;
    main;
    footer;
    constructor(classNamesOrOptions, optionsOrUndefined) {
        let classNames = "";
        let options;
        if (typeof classNamesOrOptions === "string") {
            classNames = classNamesOrOptions;
            if (optionsOrUndefined === undefined) {
                throw new Error("DropdownMenuOptions is required");
            }
            options = optionsOrUndefined;
        }
        else {
            options = classNamesOrOptions;
        }
        super(`.dropdown-menu${classNames}`);
        this.options = options;
        window.getSelection()?.empty();
        for (const node of BodyNode.children) {
            if (node instanceof DropdownMenu)
                node.remove();
        }
        this.append(this.header = el("header"), this.main = el("main"), this.footer = el("footer"));
        this.onWindow("click", (event) => {
            if (!this.htmlElement.contains(event.target)) {
                this.remove();
            }
        }).onWindow("touchstart", (event) => {
            if (!this.htmlElement.contains(event.target)) {
                this.remove();
            }
        }).onWindow("keydown", (event) => {
            if (event.key === "Escape")
                this.remove();
        });
        this.appendTo(BodyNode).adjustPosition();
    }
    adjustPosition() {
        const rect = this.calculateRect();
        let left = 0, top = 0;
        if (this.options.left !== undefined) {
            left = this.options.left;
        }
        else if (this.options.right !== undefined) {
            left = this.options.right - rect.width;
        }
        if (this.options.top !== undefined) {
            top = this.options.top;
        }
        else if (this.options.bottom !== undefined) {
            top = this.options.bottom - rect.height;
        }
        if (left + rect.width > window.innerWidth) {
            left = window.innerWidth - rect.width;
        }
        if (left < 0)
            left = 0;
        if (top + rect.height > window.innerHeight) {
            top = window.innerHeight - rect.height;
        }
        if (top < 0)
            top = 0;
        this.style({ left: `${left}px`, top: `${top}px` });
    }
    appendToHeader(...children) {
        this.header.append(...children);
        this.adjustPosition();
        return this;
    }
    appendToMain(...children) {
        this.main.append(...children);
        this.adjustPosition();
        return this;
    }
    appendToFooter(...children) {
        this.footer.append(...children);
        this.adjustPosition();
        return this;
    }
}
//# sourceMappingURL=DropdownMenu.js.map