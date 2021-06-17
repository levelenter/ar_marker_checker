// import { Uri, URIs } from './common/URIs';
import { loadBizClass } from "./loadBizClass";
import { generateClientProxy } from "./generateClientProxy";
import {
  generateRestAPI,
  ignoreTokenFileCreate,
} from "./generateExpressRouter";
import { checkDecorater } from "./checkDecorater";
import config from "../generator.config";

const CLIENT_OUT_PATH = config.CLIENT_OUT_PATH;
const GEN_REST_PATH = config.GEN_REST_PATH;
const GEN_IGNORE_LIST_PATH = config.GEN_IGNORE_LIST_PATH;

console.log("-------------------------");
console.log("- ロード開始");
console.log("-------------------------");
const classes = loadBizClass();

console.log("-------------------------");
console.log("- クライアントサイド生成");
console.log("-------------------------");
// クライアントサイド生成
generateClientProxy(classes, CLIENT_OUT_PATH);
console.log("クライアントサイド生成 done");

console.log("-------------------------");
console.log("- サーバーサイド生成");
console.log("-------------------------");
// サーバーサイド生成
generateRestAPI(classes, GEN_REST_PATH);
ignoreTokenFileCreate(classes, GEN_IGNORE_LIST_PATH);
console.log("サーバーサイド生成 done");

console.log("-------------------------");
console.log("- 整合性チェック");
console.log("-------------------------");
checkDecorater(classes);
console.log("done");
