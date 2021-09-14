/* eslint-disable @typescript-eslint/camelcase */
// クイズのDAO
import { BaseDao } from "../../../framework/dao/BaseDao";
import { ResultSetHeader } from 'mysql2';
import { LeafQuiz } from '../../dto/generated/LeafQuiz';
export class LeafQuizDaoGen extends BaseDao {
  public readonly TABLE_NAME = "leaf_quiz";

  // LeafQuizを全件取得
  async selectAll(): Promise<LeafQuiz[]> {
    const sql = 'SELECT * FROM leaf_quiz ';
    return await this.db.query<LeafQuiz>(sql);
  }
  // LeafQuizを主キーで取得
  async selectById(quiz_id: number): Promise<LeafQuiz> {
    const sql = 'SELECT * FROM leaf_quiz WHERE  quiz_id = ?  ';
    const params = [quiz_id];
    const results = await this.db.query<LeafQuiz>(sql, params);
    return results[0];
  }
  // LeafQuizを主キーで削除
  async deleteById(quiz_id: number): Promise<ResultSetHeader> {
    const sql = 'DELETE FROM leaf_quiz WHERE  quiz_id = ?  ';
    const params = [quiz_id];
    return await this.db.execute(sql, params);
  }
  // LeafQuizを挿入
  async insert(value: LeafQuiz): Promise<ResultSetHeader> {
    const sql = this.makeInsertSQL('leaf_quiz', value);
    const params = this.buildParams(value);
    return await this.db.execute(sql, params);
  }
  // LeafQuizを主キーで更新
  async update(value: LeafQuiz): Promise<ResultSetHeader> {
    const keyVo = { quiz_id: value.quiz_id };
    const sql = this.makeUpdateSQL('leaf_quiz', keyVo, value);
    const params = this.buildParams(value);
    return await this.db.execute(sql, params);
  }
  // LeafQuizを主キーで検索し、なければ挿入、あれば更新
  async insertOrUpdate(entity: LeafQuiz): Promise<ResultSetHeader> {
    return this.insertOrUpdateByObject(this.TABLE_NAME, entity.getPrimaryKeys(), entity);
  }
}
