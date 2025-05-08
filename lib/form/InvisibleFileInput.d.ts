interface InvisibleFileInputOptions {
    multiple?: boolean;
    accept?: string;
    onChange: (files: File[]) => void;
}
export default class InvisibleFileInput extends Dom<HTMLInputElement> {
    private options;
    constructor(options: InvisibleFileInputOptions);
    openFileSelector(): void;
    private handleChange;
}
export {};
//# sourceMappingURL=InvisibleFileInput.d.ts.map