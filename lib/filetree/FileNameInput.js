import { Dom } from "@commonmodule/app";
export default class FileNameInput extends Dom {
    removing = false;
    constructor(onConfirm) {
        super("input.file-name-input");
        this.on("visible", () => this.htmlElement.focus());
        this.on("keydown", (event) => {
            if (this.removing)
                return;
            if (event.key === "Enter") {
                if (this.htmlElement.value) {
                    onConfirm(this.htmlElement.value);
                }
                this.removing = true;
                this.remove();
            }
            else if (event.key === "Escape") {
                this.removing = true;
                this.remove();
            }
        });
        this.on("blur", () => {
            if (this.removing)
                return;
            if (this.htmlElement.value) {
                onConfirm(this.htmlElement.value);
            }
            this.removing = true;
            this.remove();
        });
    }
}
//# sourceMappingURL=FileNameInput.js.map