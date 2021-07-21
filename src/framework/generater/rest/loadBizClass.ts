import fs from "fs";
import path from "path";
import ts from "typescript";

import { MetaClass } from "./MetaClass";
import { MetaMethod } from "./MetaMethod";
import { MetaParam } from "./MetaParam";
import config from "../../../../config/generator.config";

import { createIfNotExist } from "./util";

const IF_PATH = config.rest.service.dir;

/**
 * ディレクトリかどうかを返す
 * @param fileName
 * @param dir
 */
function isDirectory(fileName: string, dir: string) {
  const fullPath = path.join(dir, fileName);
  return fs.statSync(fullPath).isDirectory();
}

/**
 * TSファイルからTSのメタデータを取り出す
 * @param fileName ソースファイル
 * @param dir ソースディレクトリ
 */
function loadFile(fileName: string, dir: string) {
  const fullPath = path.join(dir, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const target = ts.ScriptTarget.Latest;
  const node = ts.createSourceFile(fileName, fileContents, target);
  return node;
}

export function loadBizClass(): MetaClass[] {
  // 最終戻り値
  const classList: MetaClass[] = [];

  const ifFiles = createIfNotExist(IF_PATH);
  console.log(ifFiles);
  for (const fileName of ifFiles) {
    if (isDirectory(fileName, IF_PATH)) {
      continue;
    }
    const node = loadFile(fileName, IF_PATH);
    const srcFile = node.getSourceFile();

    node.forEachChild(child => {
      if (!ts.isClassDeclaration(child)) {
        console.error(`${fileName}はクラスではありません`);
        return;
      }

      // メタクラスのインスタンスを生成
      const metaClass: MetaClass = new MetaClass();
      // クラス名を取得
      if (!child.name) return;
      metaClass.name = child.name.escapedText.toString();
      console.log(metaClass.name);

      child.members.forEach(member => {
        if (ts.isMethodDeclaration(member)) {
          // メタメソッドのインスタンスを生成
          const metaMethod = new MetaMethod();

          const name = member.name;
          if (!ts.isPropertyName(name)) return;
          metaMethod.name = name.getText(srcFile);

          // パラメータを取り出す
          metaMethod.params = member.parameters.map(param => {
            if (!param.type) throw new Error(`クラス:${fileName} メンバ:${member.name.getText(srcFile)} 引数:${param.name.getText(srcFile)}の引数の型が指定されませんでした`);
            const metaParam = new MetaParam();
            metaParam.name = param.name.getText(srcFile);
            metaParam.type = param.type.getText(srcFile);
            return metaParam;
          });

          // 戻り値
          if (!member.type) throw new Error(`クラス:${fileName} メンバ:${member.name.getText(srcFile)} の戻り値型が取れない`);
          metaMethod.returnType = member.type.getText(srcFile);

          if (!member.decorators) return; //throw new Error("デコレータが取れない");

          member.decorators.forEach(dec => {
            // console.log('dec ex', dec.expression);
            const l1 = ts.SyntaxKind[dec.expression.kind];
            // console.log('l1', l1);
            const decChildren = dec.expression.getChildren(srcFile);

            if (decChildren[0].getText(srcFile) === "Rest") {
              // console.log(
              //   '2 kind ',
              //   ts.SyntaxKind[decChildren[2].kind],
              //   decChildren[2].getText(srcFile)
              // );
              const params = decChildren[2].getChildren(srcFile);
              metaMethod.uri = params[0].getText(srcFile);
              metaMethod.httpMethod = params[2].getText(srcFile);

              // トークンを必要としない場合"false"
              if (params[4]) {
                const requireToken = params[4].getText(srcFile);
                metaMethod.requireToken = requireToken;
              }

              metaMethod.isRestDecorated = true;
            }
          });

          // メソッドを保存
          metaClass.methods.push(metaMethod);
        }
      });

      // クラス情報を保存
      classList.push(metaClass);
    });
  }
  return classList;
}
