import { UsersDaoGen } from "./generated/UsersDaoGen";
import { Users } from "../dto/generated/Users";

export class UsersDao extends UsersDaoGen {
  async getUserByMailAndPass(mail: string, hash: string): Promise<Users[]> {
    const sql = "SELECT * FROM users WHERE email = ? AND password_hash = ? ";
    const param = [mail, hash];
    return this.db.query<Users>(sql, param);
  }

  async getUserByMail(mail: string) {
    const sql = "SELECT * FROM users WHERE mail = ? ";
    const param = [mail];
    return this.db.query<Users>(sql, param);
  }

  async insertUser(userId: string, name: string, mail: string, hash: string) {
    const insertSql = "insert into users (user_id, name ,email, password_hash) values (?, ?, ?, ? )";
    const param = [userId, name, mail, hash];
    return this.db.execute(insertSql, param);
  }
}
