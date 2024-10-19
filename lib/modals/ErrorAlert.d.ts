import Alert from "./Alert.js";
export default class ErrorAlert extends Alert {
    constructor(options: {
        title: string;
        message: string;
        confirmButtonTitle?: string;
        onConfirm?: () => void;
    });
}
//# sourceMappingURL=ErrorAlert.d.ts.map