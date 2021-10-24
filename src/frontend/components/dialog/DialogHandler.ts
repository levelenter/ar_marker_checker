import { DialogHandlerCore } from "../../../framework/components/dialog/DialogHandlerCore";

export class DialogHandler extends DialogHandlerCore {
  static singInDialogId = "loginDialog";
  static tableDialogId = "tableDialog";
  static qrDialogId = "qrDialogId";
  static showTableDialog(): void {
    this.show(this.tableDialogId);
  }
  static showSingInDialog(): void {
    this.show(this.singInDialogId);
  }

  static qrData = "";
  static showQrDialog(): void {
    this.show(this.qrDialogId);
  }
}
