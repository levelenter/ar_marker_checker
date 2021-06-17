import fs from "fs";
import config from "../generator.config";

const DTO_DIR_FILES_PATH = config.rest.remote.import.dto;
const GEN_ENTITY_DIR_FILES_PATH = config.rest.remote.import.entity;
const PARAMS_DIR_FILES_PATH = config.rest.remote.import.param;
// 引数のインポートをしないプリミティブ型
export const Primitive = [
  "string",
  "number",
  "boolean",
  "void",
  "any",
  "undefined",
  "Date",
];

/**
 * 型に含められるクラスの種類を返す（entity dao paramだけ）
 * @param typeName
 */
export function findClassDef(
  typeName: string
): "entity" | "dto" | "param" | null {
  // エンティティとDTOのフォルダに含むファイル名リスト
  const ENTITY_DIR_FILES = fs.readdirSync(DTO_DIR_FILES_PATH);

  const tsf = `${typeName}.ts`;
  const entitis = ENTITY_DIR_FILES.filter((v) => v === tsf);
  if (entitis.length > 0) {
    return "dto";
  }
  const GEN_ENTITY_DIR_FILES = fs.readdirSync(GEN_ENTITY_DIR_FILES_PATH);
  const genEntities = GEN_ENTITY_DIR_FILES.filter((v) => v === tsf);
  if (genEntities.length > 0) {
    return "entity";
  }
  const PARAMS_DIR_FILES = fs.readdirSync(PARAMS_DIR_FILES_PATH);
  const params = PARAMS_DIR_FILES.filter((v) => v === tsf);
  if (params.length > 0) {
    return "param";
  }
  return null;
}

/**
 * 配列の中の重複を除去
 * @param original
 */
export function distinctArray<T>(original: T[]): T[] {
  return original.filter(function(x, i, self) {
    return self.indexOf(x) === i;
  });
}

/**
 * 配列の中の重複をリストアップ
 * @param original
 */
export function duplicateInArray<T>(original: T[]): T[] {
  return original.filter(function(x, i, self) {
    return self.indexOf(x) !== self.lastIndexOf(x);
  });
}

/**
 * 2次元配列を1次元配列に変換
 */
export function flatArray<T>(original: T[][]): T[] {
  return original.reduce((pre, current) => {
    pre.push(...current);
    return pre;
  }, []);
}
