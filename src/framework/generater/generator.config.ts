const config = {
  a5erFile: "./database/daef_academy.er.a5er",
  createSqlFile: "./database/init/create_table.sql",

  generateDirClient: "./src/frontend/entity/generated",
  generateDirServer: "./src/server/entity/generated",
  generateDaoServer: "./src/server/dao/generated",

  CLIENT_OUT_PATH: "./src/frontend/biz/remote",
  GEN_REST_PATH: "./src/framework/web/generatedRest.ts",
  GEN_IGNORE_LIST_PATH: "./src/framework/web/ignoreTokenUriList.ts",

  RESPONSE_DIR_FROM_CLIENT_GEN: "../../../framework/biz/",
  rest: {
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
  }, // REST_BIZ_DIR_PATH_FROM_WEB_GENERATOR
};
export default config;
