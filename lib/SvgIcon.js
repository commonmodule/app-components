import { DomNode } from "@commonmodule/app";
export default class SvgIcon extends DomNode {
    constructor(classNamesOrViewBox, viewBoxOrPath, path) {
        let classNames = "";
        let viewBox;
        let svgPath;
        if (typeof path === "string") {
            classNames = classNamesOrViewBox;
            viewBox = viewBoxOrPath;
            svgPath = path;
        }
        else {
            viewBox = classNamesOrViewBox;
            svgPath = viewBoxOrPath;
        }
        super(`.icon.svg${classNames}`);
        const svg = `<svg fill="currentColor" width="100%" height="100%" viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg">${svgPath}</svg>`;
        this.htmlElement.innerHTML = svg;
    }
}
//# sourceMappingURL=SvgIcon.js.map