import { Dom } from "@commonmodule/app";
import InvisibleFileInput from "./InvisibleFileInput.js";
export default class FileDropzone extends Dom {
    invisibleFileInput;
    constructor(classNamesOrOptions, optionsOrChild, ...children) {
        let classNames = "";
        let options;
        if (typeof classNamesOrOptions === "string") {
            classNames = classNamesOrOptions;
            if (optionsOrChild === undefined) {
                throw new Error("Expected options to be provided");
            }
            options = optionsOrChild;
        }
        else {
            options = classNamesOrOptions;
            if (optionsOrChild) {
                children = [optionsOrChild, ...children];
            }
        }
        super(`.file-dropzone${classNames}`, ...children);
        this.append(this.invisibleFileInput = new InvisibleFileInput({
            accept: options.accept,
            multiple: options.multiple,
            onChange: (files) => {
                if (files.length > 0)
                    options.onUpload(files);
            },
        }));
        this.on("click", () => {
            this.invisibleFileInput.openFileSelector();
        });
        this.on("dragenter", (event) => {
            event.preventDefault();
            this.addClass("drag-hover");
        });
        this.on("dragover", (event) => {
            event.preventDefault();
            this.addClass("drag-hover");
            event.dataTransfer.dropEffect = "copy";
        });
        this.on("dragleave", () => {
            this.removeClass("drag-hover");
        });
        this.on("drop", (event) => {
            event.preventDefault();
            this.removeClass("drag-hover");
            if (event.dataTransfer && event.dataTransfer.files.length > 0) {
                options.onUpload(Array.from(event.dataTransfer.files));
            }
        });
    }
}
//# sourceMappingURL=FileDropzone.js.map