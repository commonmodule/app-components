import { Dom } from "@commonmodule/app";

export interface DropdownMenuItemOptions {
  icon?: Dom;
  label?: string;
  onClick: () => void;
}

export default class DropdownMenuItem extends Dom {
  constructor(options: DropdownMenuItemOptions) {
    super("a.dropdown-menu-item");
    this.append(options.icon, options.label);
    this.on("click", () => options.onClick());
  }
}
