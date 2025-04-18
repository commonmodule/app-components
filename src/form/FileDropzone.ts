import { DomNode } from "@commonmodule/app";
import InvisibleFileInput from "./InvisibleFileInput.js";

interface FileDropzoneOptions {
  accept: string;
  multiple?: boolean;
  onUpload: (files: File[]) => void;
}

export default class FileDropzone<
  H extends HTMLElement = HTMLElement,
  E extends Record<string, (...args: any[]) => any> = {},
> extends DomNode<H, E> {
  private invisibleFileInput: InvisibleFileInput;

  constructor(
    classNames: `.${string}`,
    options: FileDropzoneOptions,
    ...children: DomNode[]
  ) {
    super(`.file-dropzone${classNames}`, ...children);

    this.append(
      this.invisibleFileInput = new InvisibleFileInput({
        accept: options.accept,
        multiple: options.multiple,
        onChange: (files) => {
          if (files.length > 0) options.onUpload(files);
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
        options.onUpload(Array.from(event.dataTransfer.files));
      }
    });
  }
}
