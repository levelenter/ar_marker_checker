import { LeafQuizDaoGen } from "./generated/LeafQuizDaoGen";
import { LeafQuiz } from "../dto/generated/LeafQuiz";
import { ResultSetHeader } from "mysql2";

export class LeafQuizDao extends LeafQuizDaoGen {
  async updateQuiz(id: number, title: string, contents: string, auther: string) {
    const sql = `update leaf_quiz set quiz_title = ? quiz_contents = ? quiz_auther = ? where quiz_id = ?`;
    const param = [title, contents, auther, id];
    return this.db.execute(sql, param);
  }
}
