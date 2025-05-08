import { DomNode } from "@commonmodule/app";
import { EventRecord } from "@commonmodule/ts";
interface FileDropzoneOptions {
    accept: string;
    multiple?: boolean;
    onUpload: (files: File[]) => void;
}
export default class FileDropzone<H extends HTMLElement = HTMLElement, E extends EventRecord = {}> extends Dom<H, E> {
    private invisibleFileInput;
    constructor(classNames: `.${string}`, options: FileDropzoneOptions, ...children: DomNode[]);
}
export {};
//# sourceMappingURL=FileDropzone.d.ts.map