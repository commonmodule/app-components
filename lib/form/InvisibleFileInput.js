import { DomNode } from "@common-module/app";
export default class InvisibleFileInput extends DomNode {
    options;
    constructor(options) {
        super("input.invisible-file-input", {
            type: "file",
            ...options,
            style: { display: "none" },
            onchange: () => this.handleChange(),
        });
        this.options = options;
    }
    openFileSelector() {
        this.htmlElement.click();
    }
    handleChange() {
        const files = this.htmlElement.files;
        if (files)
            this.options.onChange(Array.from(files));
        this.htmlElement.value = "";
    }
}
//# sourceMappingURL=InvisibleFileInput.js.map