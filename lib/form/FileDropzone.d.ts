import { DomNode } from "@common-module/app";
interface FileDropzoneOptions {
    accept: string;
    multiple?: boolean;
    onUpload: (files: File[]) => void;
}
export default class FileDropzone extends DomNode {
    private options;
    private invisibleFileInput;
    constructor(classNames: `.${string}`, options: FileDropzoneOptions, ...children: DomNode[]);
}
export {};
//# sourceMappingURL=FileDropzone.d.ts.map