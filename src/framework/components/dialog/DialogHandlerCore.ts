const bootstrap = (window as any).bootstrap;

export class DialogHandlerCore {
  static showDialog(id: string): void {
    const modal = document.getElementById(id);
    if (!modal) {
      console.error(`id:${id}のダイアログが見つかりません`);
      return;
    }
    const myModal = new bootstrap.Modal(modal, {
      keyboard: true
    });
    myModal.show();
  }

  static hideDialog(id: string): void {
    const modal = document.getElementById(id);
    if (!modal) return;
    const modalInstance = bootstrap.Modal.getInstance(modal);
    modalInstance.hide();
  }

  static show(id: string): void {
    this.showDialog(id);
  }

  static onOpenDialog(dialogId: string, handler: (e: Event) => void): void {
    const dialog = document.getElementById(dialogId);
    if (dialog) {
      dialog.addEventListener("shown.bs.modal", handler);
    }
  }

  static onHideDialog(dialogId: string, handler: (e: Event) => void): void {
    const dialog = document.getElementById(dialogId);
    if (dialog) {
      dialog.addEventListener("hide.bs.modal", handler);
    }
  }
}
