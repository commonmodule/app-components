import { Dom, DomChild } from "@commonmodule/app";
import { EventHandlers } from "@commonmodule/ts";
import InvisibleFileInput from "./InvisibleFileInput.js";

interface FileDropzoneOptions {
  accept?: string;
  multiple?: boolean;
  onUpload: (files: File[]) => void;
}

export default class FileDropzone<
  H extends HTMLElement = HTMLElement,
  E extends EventHandlers = {},
> extends Dom<H, E> {
  private invisibleFileInput: InvisibleFileInput;

  constructor(
    classNamesOrOptions: `.${string}` | FileDropzoneOptions,
    optionsOrChild?: FileDropzoneOptions | DomChild<H>,
    ...children: DomChild<H>[]
  ) {
    let classNames: `.${string}` | string = "";
    let options: FileDropzoneOptions;

    if (typeof classNamesOrOptions === "string") {
      classNames = classNamesOrOptions;
      if (optionsOrChild === undefined) {
        throw new Error("Expected options to be provided");
      }
      options = optionsOrChild as FileDropzoneOptions;
    } else {
      options = classNamesOrOptions as FileDropzoneOptions;
      if (optionsOrChild) {
        children = [optionsOrChild as DomChild<H>, ...children];
      }
    }

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
