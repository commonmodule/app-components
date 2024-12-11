import { DomNode } from "@common-module/app";
export default abstract class Modal<E extends Record<string, (...args: any[]) => any> = {}> extends DomNode<HTMLDialogElement, E> {
    private modal;
    protected closeListener: () => void;
    constructor(classNames: `.${string}`, modal?: boolean);
}
//# sourceMappingURL=Modal.d.ts.map