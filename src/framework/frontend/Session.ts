import { MessageDialog } from "./MessageDialog";
type SESSION_KEYS = "USER";

export class Session {
  static logout() {
    sessionStorage.clear();
  }
  static timeout() {
    sessionStorage.clear();
    MessageDialog.alert("セッションタイムアウトしました");
    location.reload();
  }

  /**
   *
   * @param key SESSION_KEYSに限定
   * @param val
   */
  static set<T>(key: SESSION_KEYS, val: T) {
    //valがobjならJSON化する
    if (val instanceof Object) {
      sessionStorage.setItem(key, JSON.stringify(val));
    } else {
      //存在するキーがあれば上書きする
      sessionStorage.setItem(key, `${val}`);
    }
  }

  static isExist(key: SESSION_KEYS): boolean {
    const data = sessionStorage.getItem(key);
    return data ? true : false;
  }

  static get<T>(key: SESSION_KEYS): T | null {
    const rawValue = sessionStorage.getItem(key);
    if (rawValue) {
      try {
        const item: T = JSON.parse(rawValue) as T;
        return item;
      } catch {
        return rawValue as any;
      }
    } else {
      return null;
    }
  }
  static getSessionUser() {
    const user = Session.get<any>("USER");
    if (!user) return {};
    return user;
  }

  static getJwtToken(): string {
    const user = this.getSessionUser();
    if (!user) {
      return "";
    }
    return user.token;
  }
}
