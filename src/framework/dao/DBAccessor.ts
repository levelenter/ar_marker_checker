// 参考 https://qiita.com/PianoScoreJP/items/7ed172cd0e7846641e13

import { RowDataPacket, FieldPacket, ResultSetHeader } from 'mysql2';
import { PoolConnection } from 'mysql2/promise';

// pool.on('enqueue', () => {
//   console.log('コネクションのエンキュー');
// });

// pool.on('connection', (con): any => {
//   console.log('コネクションの接続');
// });

// pool.on('acquire', (con): any => {
//   console.log('コネクションの獲得時');
// });
// pool.on('release', (con): any => {
//   console.log('コネクションのリリース時');
// });

export class DBAccessor {
  /**
   * クエリSQLを実行して型付きで返すジェネリックな関数
   * @param sql
   * @param param
   */
  async query<T>(con: PoolConnection, sql: string, param?: any, nestTables = false): Promise<T[]> {
    const result: [RowDataPacket[], FieldPacket[]] = await con.query({ sql: sql, nestTables: nestTables }, param);
    if (result[0].length === 0) {
      return [];
    }
    return result[0].map((row) => {
      return row as T;
    });
  }

  /**
   * DMLを実行して結果を返す
   * @param sql SQL
   * @param param パラメータ（省略可能）
   */
  async execute(con: PoolConnection, sql: string, param?: any): Promise<ResultSetHeader> {
    const result: [ResultSetHeader, FieldPacket[]] = await con.execute(sql, param);
    return result[0] as ResultSetHeader;
  }
}

// export const db = new DBAccessor();
