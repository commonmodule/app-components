import { DomNode } from "@commonmodule/app";
import { EventRecord } from "@commonmodule/ts";
export default abstract class Modal<E extends EventRecord = EventRecord> extends DomNode<HTMLDialogElement, E> {
    private modal;
    protected closeListener: () => void;
    constructor(classNames: `.${string}`, modal?: boolean);
}
//# sourceMappingURL=Modal.d.ts.map