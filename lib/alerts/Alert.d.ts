import { DomNode } from "@common-module/app";
interface AlertOptions {
    icon: DomNode;
    message: string;
}
export default abstract class Alert extends DomNode {
    constructor(classNames: `.${string}`, options: AlertOptions);
}
export {};
//# sourceMappingURL=Alert.d.ts.map