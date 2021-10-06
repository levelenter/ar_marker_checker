import { DialogHandlerCore } from "../../../framework/components/dialog/DialogHandlerCore";

export class DialogHandler extends DialogHandlerCore {
  static singInDialogId = "loginDialog";
  static tableDialogId = "tableDialog";
  static showTableDialog(): void {
    this.show(this.tableDialogId);
  }
  static showSingInDialog(): void {
    this.show(this.singInDialogId);
  }
}
