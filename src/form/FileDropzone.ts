import { Dom } from "@commonmodule/app";
import { EventHandlers } from "@commonmodule/ts";
import InvisibleFileInput from "./InvisibleFileInput.js";

interface FileDropzoneOptions {
  accept: string;
  multiple?: boolean;
  onUpload: (files: File[]) => void;
}

export default class FileDropzone<
  H extends HTMLElement = HTMLElement,
  E extends EventHandlers = {},
> extends Dom<H, E> {
  private invisibleFileInput: InvisibleFileInput;

  constructor(
    classNames: `.${string}`,
    options: FileDropzoneOptions,
    ...children: Dom[]
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
      event.dataTransfer!.dropEffect = "copy";
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
