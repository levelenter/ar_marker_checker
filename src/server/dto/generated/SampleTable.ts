/* eslint-disable @typescript-eslint/camelcase */
// サンプルテーブルのエンティティ
export class SampleTable {
  // ID DB型(*autokey)
  public id?: number;
  // 作成日 DB型(DATETIME)
  public create_dt?: Date;
  // メモ DB型(MEDIUMTEXT)
  public memo?: string;
  static fromDB(record: { [column: string]: any; [column: number]: any }): SampleTable {
    const entity = new SampleTable();
    entity.id = record['id'];
    entity.create_dt = record['create_dt'];
    entity.memo = record['memo'];
    return entity;
  }
  getPrimaryKeys(): { "id": number | undefined } {
    const entity = {
    "id" : this.id 
    }
    return entity;
  }
  static getTypeFitEntity(value: any): SampleTable {
    const entity = new SampleTable();
    entity.id = value.id;
    entity.create_dt = value.create_dt;
    entity.memo = value.memo;
    return entity;
  }
}
