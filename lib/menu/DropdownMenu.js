import { BodyNode, DomNode, el } from "@common-module/app";
export default class DropdownMenu extends DomNode {
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
        window.getSelection()?.empty();
        for (const node of BodyNode.children) {
            if (node instanceof DropdownMenu)
                node.remove();
        }
        this.style({ left: `${options.left}px`, top: `${options.top}px` }).append(this.header = el("header"), this.main = el("main"), this.footer = el("footer")).appendTo(BodyNode);
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
    }
    adjustPosition() {
        const rect = this.calculateRect();
        if (rect.left + rect.width > window.innerWidth) {
            this.style({ left: `${window.innerWidth - rect.width}px` });
        }
        if (rect.top + rect.height > window.innerHeight) {
            this.style({ top: `${window.innerHeight - rect.height}px` });
        }
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