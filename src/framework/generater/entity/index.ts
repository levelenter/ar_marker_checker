import fs from "fs";
import path from "path";
import { EntityMeta } from "./EntityMeta";
import { rebuildFolder, deleteFolderRecursive } from "../cleanFolder";
import { loadMetadataMain } from "./loadMetadataMain";
import { insertCharsetStatement } from "./insertCharsetStatement";
import config from "../../../../config/generator.config";
import { exit } from "process";

// A5SQLファイル
const a5erFile = config.a5erFile;

// createSQLfile
const createSqlFile = config.createSqlFile;

const generateDirServer = config.db.generate.entity;
const generateDaoServer = config.db.generate.dao;

// 自動生成フォルダをクリーン
function generate(metas: EntityMeta[], generateDir: string) {
  const generateDirPath = path.resolve(generateDir);
  deleteFolderRecursive(generateDirPath);
  rebuildFolder(generateDirPath);

  // 自動生成開始
  metas.forEach((meta: EntityMeta) => {
    console.log(meta.lName, meta.pName);
    const outFilePath = path.join(generateDirPath, meta.outFileName);
    fs.writeFileSync(outFilePath, meta.toEntityDefString());
  });
}

// 自動生成フォルダをクリーン
function generateDao(metas: EntityMeta[], generateDir: string) {
  // メタデータから文字列へ
  const generateDirPath = path.resolve(generateDir);
  deleteFolderRecursive(generateDirPath);
  rebuildFolder(generateDirPath);

  // 自動生成開始
  metas.forEach((meta: EntityMeta) => {
    console.log(meta.lName, meta.pName);
    const outFilePath = path.join(generateDirPath, meta.outDaoFileName);
    fs.writeFileSync(outFilePath, meta.toDaoString());
  });
}

function main() {
  console.log("-------------------------");
  console.log("- DBエンティティ＆DAO生成開始");
  console.log("-------------------------");

  console.log("-------------------------");
  console.log("- エンコード文字列チェック＋更新");
  console.log("-------------------------");
  insertCharsetStatement(createSqlFile);

  console.log("-------------------------");
  console.log("- ロード開始");
  console.log("-------------------------");
  if (!fs.existsSync(a5erFile)) {
    console.log("a5erファイルが存在しません。処理を終了します。");
    return;
  }
  const metas = loadMetadataMain(a5erFile);

  console.log("-------------------------");
  console.log("- サーバーエンティティ生成");
  console.log("-------------------------");
  generate(metas, generateDirServer);

  console.log("-------------------------");
  console.log("- DAO生成");
  console.log("-------------------------");
  generateDao(metas, generateDaoServer);

  console.log("Generate Done!!!");
}
main();
