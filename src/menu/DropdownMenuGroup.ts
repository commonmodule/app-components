import { DomChild, DomNode } from "@common-module/app";

export default class DropdownMenuGroup extends DomNode {
  constructor(...children: DomChild[]) {
    super(".dropdown-menu-group", ...children);
  }
}
