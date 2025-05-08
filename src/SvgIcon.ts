import { Dom } from "@commonmodule/app";

export default class SvgIcon extends Dom {
  constructor(classNames: `.${string}`, viewBox: string, path: string);
  constructor(viewBox: string, path: string);
  constructor(
    classNamesOrViewBox: `.${string}` | string,
    viewBoxOrPath: string,
    path?: string,
  ) {
    let classNames = "";
    let viewBox: string;
    let svgPath: string;

    if (typeof path === "string") {
      classNames = classNamesOrViewBox as `.${string}`;
      viewBox = viewBoxOrPath;
      svgPath = path;
    } else {
      viewBox = classNamesOrViewBox as string;
      svgPath = viewBoxOrPath;
    }

    super(`.icon.svg${classNames}`);
    const svg =
      `<svg fill="currentColor" width="100%" height="100%" viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg">${svgPath}</svg>`;
    this.htmlElement.innerHTML = svg;
  }
}
