import { DomNode } from "@common-module/app";
interface FileDropzoneOptions {
    accept: string;
    multiple?: boolean;
    onUpload: (files: File[]) => void;
}
export default class FileDropzone<HE extends HTMLElement = HTMLElement, ET extends Record<string, (...args: any[]) => any> = {}> extends DomNode<HE, ET> {
    private invisibleFileInput;
    constructor(classNames: `.${string}`, options: FileDropzoneOptions, ...children: DomNode[]);
}
export {};
//# sourceMappingURL=FileDropzone.d.ts.map