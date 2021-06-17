const config = {
  a5erFile: "./database/er/db.er.a5er",
  createSqlFile: "./database/init/create_table.sql",

  generateDirClient: "./src/frontend/entity/generated",
  generateDirServer: "./src/server/entity/generated",
  generateDaoServer: "./src/server/dao/generated",

  CLIENT_OUT_PATH: "./src/frontend/biz/remote",

  framework: {
    biz: { dir: "../../../framework/biz/" },
  },
  rest: {
    genarete: {
      path: "./src/framework/web/generatedRest.ts",
      ignoreTokenFilePath: "./src/framework/web/ignoreTokenUriList.ts",
    },
    service: {
      from: { router: { dir: "../../server/biz/" } },
      dir: "./src/server/biz/",
      import: {
        dto: "./src/server/entity/dto",
        entity: "./src/server/entity/generated",
        param: "./src/server/param",
      },
    },
    remote: {
      import: {
        dto: "../../../server/entity/dto/",
        entity: "../../../server/entity/generated/",
        param: "../../../server/param/",
      },
    },
  },
};
export default config;
