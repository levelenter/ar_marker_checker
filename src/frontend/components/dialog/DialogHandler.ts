import { DialogHandlerCore } from "../../../framework/components/dialog/DialogHandlerCore";

export class DialogHandler extends DialogHandlerCore {
  static singInDialogId = "loginDialog";

  static showSingInDialog(): void {
    this.show(this.singInDialogId);
  }
}
