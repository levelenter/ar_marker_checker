/* eslint-disable @typescript-eslint/camelcase */
// ユーザーのエンティティ
export class Users {
  // ユーザーID DB型(*id)
  public user_id?: string;
  // 氏 DB型(*varchar64)
  public family_name?: string;
  // 名 DB型(*varchar64)
  public first_name?: string;
  // アカウント名 DB型(*varchar64)
  public display_name?: string;
  // メールアドレス DB型(*varchar256)
  public email?: string;
  // 登録日時 DB型(DATETIME)
  public join_dt?: Date;
  // 最終ログイン日時 DB型(DATETIME)
  public last_login_dt?: Date;
  // ログイン回数 DB型(INT)
  public login_count?: number;
  // パスワードハッシュ DB型(*varchar64)
  public password_hash?: string;
  // 写真URL DB型(*varchar256)
  public photo_url?: string;
  // メール確認 DB型(*flg)
  public email_verified?: boolean;
  static fromDB(record: { [column: string]: any; [column: number]: any }): Users {
    const entity = new Users();
    entity.user_id = record['user_id'];
    entity.family_name = record['family_name'];
    entity.first_name = record['first_name'];
    entity.display_name = record['display_name'];
    entity.email = record['email'];
    entity.join_dt = record['join_dt'];
    entity.last_login_dt = record['last_login_dt'];
    entity.login_count = record['login_count'];
    entity.password_hash = record['password_hash'];
    entity.photo_url = record['photo_url'];
    entity.email_verified = record['email_verified'];
    return entity;
  }
  getPrimaryKeys(): { "user_id": string | undefined } {
    const entity = {
    "user_id" : this.user_id 
    }
    return entity;
  }
  static getTypeFitEntity(value: any): Users {
    const entity = new Users();
    entity.user_id = value.user_id;
    entity.family_name = value.family_name;
    entity.first_name = value.first_name;
    entity.display_name = value.display_name;
    entity.email = value.email;
    entity.join_dt = value.join_dt;
    entity.last_login_dt = value.last_login_dt;
    entity.login_count = value.login_count;
    entity.password_hash = value.password_hash;
    entity.photo_url = value.photo_url;
    entity.email_verified = value.email_verified;
    return entity;
  }
}
