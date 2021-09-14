/* eslint-disable @typescript-eslint/camelcase */
// クイズのエンティティ
export class LeafQuiz {
  //  DB型(*autokey)
  public quiz_id?: number;
  //  DB型(*varchar256)
  public quiz_title?: string;
  //  DB型(MEDIUMTEXT)
  public quiz_contents?: string;
  //  DB型(*fk)
  public quiz_auther?: string;
  static fromDB(record: { [column: string]: any; [column: number]: any }): LeafQuiz {
    const entity = new LeafQuiz();
    entity.quiz_id = record['quiz_id'];
    entity.quiz_title = record['quiz_title'];
    entity.quiz_contents = record['quiz_contents'];
    entity.quiz_auther = record['quiz_auther'];
    return entity;
  }
  getPrimaryKeys(): { "quiz_id": number | undefined } {
    const entity = {
    "quiz_id" : this.quiz_id 
    }
    return entity;
  }
  static getTypeFitEntity(value: any): LeafQuiz {
    const entity = new LeafQuiz();
    entity.quiz_id = value.quiz_id;
    entity.quiz_title = value.quiz_title;
    entity.quiz_contents = value.quiz_contents;
    entity.quiz_auther = value.quiz_auther;
    return entity;
  }
}
