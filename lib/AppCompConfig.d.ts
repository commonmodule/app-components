import { Dom } from "@commonmodule/app";
import Tab from "./tab/Tab.js";
type DomConstructor = new () => Dom;
declare class AppCompConfig {
    LoadingSpinner: DomConstructor;
    CloseIcon: DomConstructor;
    ShareIcon: DomConstructor;
    DownloadIcon: DomConstructor;
    SuccessIcon: DomConstructor;
    InfoIcon: DomConstructor;
    WarningIcon: DomConstructor;
    ErrorIcon: DomConstructor;
    AccordionOpenIcon: DomConstructor;
    AccordionCloseIcon: DomConstructor;
    FolderCollapsedIcon: DomConstructor;
    FolderExpandedIcon: DomConstructor;
    MinusIcon: DomConstructor;
    PlusIcon: DomConstructor;
    PrevIcon: DomConstructor;
    NextIcon: DomConstructor;
    ZoomInIcon: DomConstructor;
    ZoomOutIcon: DomConstructor;
    ResetZoomIcon: DomConstructor;
    FullscreenIcon: DomConstructor;
    ExitFullscreenIcon: DomConstructor;
    updateTabBackgroundOnSelect: (tabBackground: Dom, tab: Tab<any>) => void;
}
declare const _default: AppCompConfig;
export default _default;
//# sourceMappingURL=AppCompConfig.d.ts.map