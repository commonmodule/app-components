import { DomNode } from "@common-module/app";
interface FileDropzoneOptions {
    accept: string;
    multiple?: boolean;
    onUpload: (files: File[]) => void;
}
export default class FileDropzone<H extends HTMLElement = HTMLElement, E extends Record<string, (...args: any[]) => any> = {}> extends DomNode<H, E> {
    private invisibleFileInput;
    constructor(classNames: `.${string}`, options: FileDropzoneOptions, ...children: DomNode[]);
}
export {};
//# sourceMappingURL=FileDropzone.d.ts.map