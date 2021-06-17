import { SampleTableDaoGen } from "./generated/SampleTableDaoGen";
import { ResultSetHeader } from "mysql2";
import { SampleTable } from "../entity/generated/SampleTable";

export class SampleTableDao extends SampleTableDaoGen {
  insertOrUpdate(entity: SampleTable) {
    return this.insertOrUpdateByObject(
      this.TABLE_NAME,
      entity.getPrimaryKeys(),
      entity
    );
  }
}
