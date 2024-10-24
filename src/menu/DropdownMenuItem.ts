import { DomNode } from "@common-module/app";

export interface DropdownMenuItemOptions {
  icon?: DomNode;
  label: string;
  onClick: () => void;
}

export default class DropdownMenuItem extends DomNode {
  constructor(options: DropdownMenuItemOptions) {
    super("a.dropdown-menu-item");
    this.append(options.icon, options.label);
    this.onDom("click", () => options.onClick());
  }
}
