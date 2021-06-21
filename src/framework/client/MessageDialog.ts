import { dayjs } from "../util/momentExtends";
import Vue from "vue";

export class MessageDialog {
  static alertModal(message: any) {
    alert(message);
  }
  static prompt(message: any, _default = ""): string | null {
    return prompt(message, _default);
  }
  static async info(message: any): Promise<string> {
    alert(message);

    return "ok";
  }
  static async alert(message: any): Promise<string> {
    // alert(message);

    return "ok";
  }

  static async systemError(
    jaFieldName: string,
    timing: string,
    value: any = ""
  ) {
    // Vue.notify({
    //   group: "alert",
    //   title: `システムエラー<span class="time">${dayjs().fromNow()}</span>`,
    //   text: `${jaFieldName}の${timing}システムエラーが発生しました${value}。画面をリロードしてやり直してみてください。操作ミスではなくシステムトラブルやバグの可能性があります。サークルオー運営にお伝えください。`,
    //   duration: -1,
    // });

    return "ok";
  }

  static async confirm(message: string): Promise<boolean> {
    return confirm(message);
  }
  static async error(message: any): Promise<void> {
    console.error(message);
    alert(message);
  }
}
