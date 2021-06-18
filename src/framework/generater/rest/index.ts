// import { Uri, URIs } from './common/URIs';
import { loadBizClass } from "./loadBizClass";
import { generateClientProxy } from "./generateClientProxy";
import {
  generateRestAPI,
  ignoreTokenFileCreate,
} from "./generateExpressRouter";
import { checkDecorater } from "./checkDecorater";
import config from "../../../../config/generator.config";

const CLIENT_OUT_PATH = config.CLIENT_OUT_PATH;
const expressRouteGeneratePath = config.rest.genarete.path;
const ignoreTokenFilePath = config.rest.genarete.ignoreTokenFilePath;

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
generateRestAPI(classes, expressRouteGeneratePath);
ignoreTokenFileCreate(classes, ignoreTokenFilePath);
console.log("サーバーサイド生成 done");

console.log("-------------------------");
console.log("- 整合性チェック");
console.log("-------------------------");
checkDecorater(classes);
console.log("done");
