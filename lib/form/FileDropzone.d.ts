import { Dom, DomChild } from "@commonmodule/app";
import { EventHandlers } from "@commonmodule/ts";
interface FileDropzoneOptions {
    accept?: string;
    multiple?: boolean;
    onUpload: (files: File[]) => void;
}
export default class FileDropzone<H extends HTMLElement = HTMLElement, E extends EventHandlers = {}> extends Dom<H, E> {
    private invisibleFileInput;
    constructor(classNamesOrOptions: `.${string}` | FileDropzoneOptions, optionsOrChild?: FileDropzoneOptions | DomChild<H>, ...children: DomChild<H>[]);
}
export {};
//# sourceMappingURL=FileDropzone.d.ts.map