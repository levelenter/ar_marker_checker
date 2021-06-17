import { snakeToPascalCase, hasZenkaku } from "./common";
import { FieldMeta } from "./FieldMeta";

export class EntityMeta {
  public pName = "";
  public lName = "";
  public fields: FieldMeta[] = [];

  get outFileName() {
    return `${this.pClassName}.ts`;
  }
  get outCCFileName() {
    return `${this.pClassName}CC.ts`;
  }
  get outDaoFileName() {
    return `${this.pClassName}DaoGen.ts`;
  }
  get daoClassName() {
    return `${this.pClassName}DaoGen`;
  }

  get pClassName() {
    return snakeToPascalCase(this.pName);
  }

  get hasName() {
    return this.pName || this.lName;
  }
  addField(line: string) {
    const field = new FieldMeta();
    field.parse(line);
    this.fields.push(field);
  }

  public parseLine(line: string) {
    const isPname = line.startsWith("PName");
    if (isPname) this.pName = line.split("=")[1];

    // console.log('this.pName', this.pName);

    const isLname = line.startsWith("LName");
    if (isLname) this.lName = line.split("=")[1];

    if (this.hasName) {
      const isField = line.startsWith("Field=");
      if (isField) this.addField(line);
    }
  }

  getEntityFromDBRecordString() {
    const properties = this.fields.map((f) => {
      return `    entity.${f.pName} = record['${f.pName}'];\n`;
    });

    let str = "";
    str += `  static fromDB(record: { [column: string]: any; [column: number]: any }): ${this.pClassName} {\n`;
    str += `    const entity = new ${this.pClassName}();\n`;
    str += properties.join("");
    str += `    return entity;\n`;
    str += `  }\n`;

    return str;
  }

  getTypeFitEntityFromAny() {
    const properties = this.fields.map((f) => {
      return `    entity.${f.pName} = value.${f.pName};\n`;
    });

    let str = "";
    str += `  static getTypeFitEntity(value: any): ${this.pClassName} {\n`;
    str += `    const entity = new ${this.pClassName}();\n`;
    str += properties.join("");
    str += `    return entity;\n`;
    str += `  }\n`;

    return str;
  }

  public toEntityDefStringWithCamelCaseProps() {
    const camelCaseProp = this.fields
      .map((f: FieldMeta) => {
        let str = `  // ${f.lName}のスネークケースget/set\n`;
        // 全角文字があったらコメントアウト
        if (hasZenkaku(f.pName)) {
          str += `/*`;
        }
        str += `  public get ${f.pNameCamel}() : ${f.type}{ return this.entity.${f.pName}!; }\n`;
        str += `  public set ${f.pNameCamel}( value :${f.type}){  this.entity.${f.pName} = value; }\n`;
        if (hasZenkaku(f.pName)) {
          str += `*/`;
        }
        return str;
      })
      .join("\n");

    let entityString = "";
    // entityString += `import { RowDataPacket } from 'mysql2'\n`;
    entityString += `import { ${this.pClassName} } from './${this.pClassName}';\n`;
    entityString += `// ${this.lName}のエンティティ\n`;
    entityString += `export class ${this.pClassName}CC {\n`;
    entityString += `  private entity: ${this.pClassName};\n`;
    entityString += `  public constructor( entity: ${this.pClassName} ){\n`;
    entityString += `    this.entity = entity;\n`;
    entityString += `  }\n\n`;
    entityString += camelCaseProp + `\n`;
    entityString += `\n}\n`;
    return entityString;
  }

  public toEntityDefString(): string {
    // スネークケースのフィールドを出す
    const filedString = this.fields
      .map((f: FieldMeta) => {
        let str = `  // ${f.lName} DB型(${f.dbType})\n`;

        // 全角文字があったらコメントアウト
        if (hasZenkaku(f.pName)) {
          str += `//`;
        }
        str += `  public ${f.pName}?: ${f.type};`;
        return str;
      })
      .join("\n");

    let entityString = `// ${this.lName}のエンティティ\n`;
    entityString += `export class ${this.pClassName} {\n`;
    entityString += filedString + `\n`;
    entityString += this.getEntityFromDBRecordString();
    entityString += this.getTypeFitEntityFromAny();
    entityString += `}\n`;

    return entityString;
  }

  toDaoString(): string {
    const selectWhere = this.fields
      .filter((f) => f.isKey)
      .map((f) => ` ${f.pName} = ? `)
      .join(" AND ");
    const selectArgs = this.fields
      .filter((f) => f.isKey)
      .map((f: FieldMeta) => `${f.pName}: ${f.type}`)
      .join(", ");
    const selectParams = this.fields
      .filter((f) => f.isKey)
      .map((f: FieldMeta) => `${f.pName}`)
      .join(", ");
    const keyVoString = this.fields
      .filter((f) => f.isKey)
      .map((f: FieldMeta) => `${f.pName}: value.${f.pName}`)
      .join(", ");

    let entityString = `// ${this.lName}のエンティティ\n`;
    entityString += `import { BaseDao } from '../BaseDao';\n`;
    entityString += `import { ResultSetHeader } from 'mysql2';\n`;
    entityString += `import { ${this.pClassName} } from '../../entity/generated/${this.pClassName}';\n`;

    entityString += `export class ${this.daoClassName} extends BaseDao {\n`;
    entityString += `  public readonly TABLE_NAME = "${this.pName}";\n\n`;
    entityString += `  // ${this.pClassName}を全件取得\n`;
    entityString += `  async selectAll(): Promise<${this.pClassName}[]> {\n`;
    entityString += `    const sql = 'SELECT * FROM ${this.pName} ';\n`;
    entityString += `    return await this.db.query<${this.pClassName}>(this.con, sql);\n`;
    entityString += `  }\n`;

    entityString += `  // ${this.pClassName}を主キーで取得\n`;
    entityString += `  async selectById(${selectArgs}): Promise<${this.pClassName}> {\n`;
    entityString += `    const sql = 'SELECT * FROM ${this.pName} WHERE ${selectWhere} ';\n`;
    entityString += `    const params = [${selectParams}];\n`;
    entityString += `    const results = await this.db.query<${this.pClassName}>(this.con, sql, params);\n`;
    entityString += `    return results[0];\n`;
    entityString += `  }\n`;

    entityString += `  // ${this.pClassName}を主キーで削除\n`;
    entityString += `  async deleteById(${selectArgs}): Promise<ResultSetHeader> {\n`;
    entityString += `    const sql = 'DELETE FROM ${this.pName} WHERE ${selectWhere} ';\n`;
    entityString += `    const params = [${selectParams}];\n`;
    entityString += `    return await this.db.execute(this.con, sql, params);\n`;
    entityString += `  }\n`;

    // entityString += `  // ${this.pClassName}を挿入\n`;
    // entityString += `  async insert(value:${this.pClassName}):Promise<ResultSetHeader> {\n`;
    // entityString += `    const sql = "INSERT INTO ${this.pName} ( ${filedList} ) values ( ${placeHolders}) ";\n`;
    // entityString += `    const params = [${paramList}];\n`;
    // entityString += `    return await this.db.execute(this.con,sql ,params);\n`;
    // entityString += `  }\n`;
    // entityString += `  // ${this.pClassName}を主キーで更新\n`;
    // entityString += `  async update(value:${this.pClassName}):Promise<ResultSetHeader> {\n`;
    // entityString += `    const sql = "UPDATE ${this.pName} SET  ${updateFields} WHERE ${updateKeyFields} ";\n`;
    // entityString += `    const params = [${paramList}].concat([${updateKeyValues}]);\n`;
    // entityString += `    return await this.db.execute(this.con,sql ,params);\n`;
    // entityString += `  }\n`;

    entityString += `  // ${this.pClassName}を挿入\n`;
    entityString += `  async insert(value: ${this.pClassName}): Promise<ResultSetHeader> {\n`;
    entityString += `    const sql = this.makeInsertSQL('${this.pName}', value);\n`;
    entityString += `    const params = this.buildParams(value);\n`;
    entityString += `    return await this.db.execute(this.con, sql, params);\n`;
    entityString += `  }\n`;

    entityString += `  // ${this.pClassName}を主キーで更新\n`;
    entityString += `  async update(value: ${this.pClassName}): Promise<ResultSetHeader> {\n`;
    entityString += `    const keyVo = { ${keyVoString} };\n`;
    entityString += `    const sql = this.makeUpdateSQL('${this.pName}', keyVo, value);\n`;
    entityString += `    const params = this.buildParams(value);\n`;
    entityString += `    return await this.db.execute(this.con, sql, params);\n`;
    entityString += `  }\n`;
    entityString += `}\n`;

    return entityString;
  }
}
