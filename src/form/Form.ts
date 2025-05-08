import { Dom, DomChild } from "@commonmodule/app";

export default class Form extends Dom {
  constructor(...children: DomChild[]) {
    super(".form", ...children);
  }
}
