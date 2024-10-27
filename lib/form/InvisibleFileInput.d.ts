import { DomNode } from "@common-module/app";
interface InvisibleFileInputOptions {
    multiple?: boolean;
    accept?: string;
    onChange: (files: File[]) => void;
}
export default class InvisibleFileInput extends DomNode<HTMLInputElement> {
    private options;
    constructor(options: InvisibleFileInputOptions);
    openFileSelector(): void;
    private handleChange;
}
export {};
//# sourceMappingURL=InvisibleFileInput.d.ts.map