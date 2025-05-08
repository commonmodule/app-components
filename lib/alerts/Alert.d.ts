import { Dom } from "@commonmodule/app";
interface AlertOptions {
    icon: Dom;
    message: string;
}
export default abstract class Alert extends Dom {
    constructor(classNames: `.${string}`, options: AlertOptions);
}
export {};
//# sourceMappingURL=Alert.d.ts.map