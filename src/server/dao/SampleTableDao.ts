import { SampleTableDaoGen } from "./generated/SampleTableDaoGen";
import { ResultSetHeader } from "mysql2";
import { SampleTable } from "../dto/generated/SampleTable";

export class SampleTableDao extends SampleTableDaoGen {
  async selectByNote(sentence: string): Promise<SampleTable[]> {
    const sql = `select * from ${this.TABLE_NAME} where memo like ?`;
    const param = [`%${sentence}%`];
    return this.db.query(sql, param);
  }
}
