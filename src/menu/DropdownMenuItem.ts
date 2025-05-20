import { Dom } from "@commonmodule/app";

export interface DropdownMenuItemOptions {
  icon?: Dom;
  label?: string;
  onPress?: () => void;
}

export default class DropdownMenuItem extends Dom {
  constructor(options: DropdownMenuItemOptions) {
    super("a.dropdown-menu-item");
    this.append(options.icon, options.label);
    if (options.onPress) this.on("click", () => options.onPress!());
  }
}
