import { DomNode } from "@common-module/app";
import InvisibleFileInput from "./InvisibleFileInput.js";

interface FileDropzoneOptions {
  accept: string;
  multiple?: boolean;
  onUpload: (files: File[]) => void;
}

export default class FileDropzone extends DomNode {
  private invisibleFileInput: InvisibleFileInput;

  constructor(
    classNames: `.${string}`,
    private options: FileDropzoneOptions,
    ...children: DomNode[]
  ) {
    super(`.file-dropzone${classNames}`, ...children);

    this.append(
      this.invisibleFileInput = new InvisibleFileInput({
        accept: options.accept,
        multiple: options.multiple,
        onChange: (files) => {
          if (files.length > 0) this.options.onUpload(files);
        },
      }),
    );

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
      event.dataTransfer!.dropEffect = "copy";
    });

    this.onDom("dragleave", () => {
      this.removeClass("drag-hover");
    });

    this.onDom("drop", (event) => {
      event.preventDefault();
      this.removeClass("drag-hover");
      if (event.dataTransfer && event.dataTransfer.files.length > 0) {
        this.options.onUpload(Array.from(event.dataTransfer.files));
      }
    });
  }
}
