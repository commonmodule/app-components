import InvisibleFileInput from "./InvisibleFileInput.js";
export default class FileDropzone extends Dom {
    invisibleFileInput;
    constructor(classNames, options, ...children) {
        super(`.file-dropzone${classNames}`, ...children);
        this.append(this.invisibleFileInput = new InvisibleFileInput({
            accept: options.accept,
            multiple: options.multiple,
            onChange: (files) => {
                if (files.length > 0)
                    options.onUpload(files);
            },
        }));
        this.onDom("click", () => {
            this.invisibleFileInput.openFileSelector();
        });
        this.onDom("dragenter", (event) => {
            event.preventDefault();
            this.addClass("drag-hover");
        });
        this.onDom("dragover", (event) => {
            event.preventDefault();
            this.addClass("drag-hover");
            event.dataTransfer.dropEffect = "copy";
        });
        this.onDom("dragleave", () => {
            this.removeClass("drag-hover");
        });
        this.onDom("drop", (event) => {
            event.preventDefault();
            this.removeClass("drag-hover");
            if (event.dataTransfer && event.dataTransfer.files.length > 0) {
                options.onUpload(Array.from(event.dataTransfer.files));
            }
        });
    }
}
//# sourceMappingURL=FileDropzone.js.map