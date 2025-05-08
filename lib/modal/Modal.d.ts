import { Dom } from "@commonmodule/app";
import { EventHandlers } from "@commonmodule/ts";
export default abstract class Modal<E extends EventHandlers = {}> extends Dom<HTMLDialogElement, E> {
    private modal;
    protected closeListener: () => void;
    constructor(classNames: `.${string}`, modal?: boolean);
}
//# sourceMappingURL=Modal.d.ts.map