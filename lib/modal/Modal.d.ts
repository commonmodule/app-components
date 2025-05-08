import { Dom, DomHandlers } from "@commonmodule/app";
export default abstract class Modal<E extends DomHandlers<E, HTMLDialogElement> = {
    close: () => void;
}> extends Dom<HTMLDialogElement, E> {
    private modal;
    protected closeListener: () => void;
    constructor(classNames: `.${string}`, modal?: boolean);
}
//# sourceMappingURL=Modal.d.ts.map