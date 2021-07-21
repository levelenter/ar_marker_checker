/* eslint-disable @typescript-eslint/camelcase */
// サンプルテーブルのDAO
import { BaseDao } from "../../../framework/dao/BaseDao";
import { ResultSetHeader } from 'mysql2';
import { SampleTable } from '../../dto/generated/SampleTable';
export class SampleTableDaoGen extends BaseDao {
  public readonly TABLE_NAME = "sample_table";

  // SampleTableを全件取得
  async selectAll(): Promise<SampleTable[]> {
    const sql = 'SELECT * FROM sample_table ';
    return await this.db.query<SampleTable>(sql);
  }
  // SampleTableを主キーで取得
  async selectById(id: number): Promise<SampleTable> {
    const sql = 'SELECT * FROM sample_table WHERE  id = ?  ';
    const params = [id];
    const results = await this.db.query<SampleTable>(sql, params);
    return results[0];
  }
  // SampleTableを主キーで削除
  async deleteById(id: number): Promise<ResultSetHeader> {
    const sql = 'DELETE FROM sample_table WHERE  id = ?  ';
    const params = [id];
    return await this.db.execute(sql, params);
  }
  // SampleTableを挿入
  async insert(value: SampleTable): Promise<ResultSetHeader> {
    const sql = this.makeInsertSQL('sample_table', value);
    const params = this.buildParams(value);
    return await this.db.execute(sql, params);
  }
  // SampleTableを主キーで更新
  async update(value: SampleTable): Promise<ResultSetHeader> {
    const keyVo = { id: value.id };
    const sql = this.makeUpdateSQL('sample_table', keyVo, value);
    const params = this.buildParams(value);
    return await this.db.execute(sql, params);
  }
  // SampleTableを主キーで検索し、なければ挿入、あれば更新
  async insertOrUpdate(entity: SampleTable): Promise<ResultSetHeader> {
    return this.insertOrUpdateByObject(this.TABLE_NAME, entity.getPrimaryKeys(), entity);
  }
}
