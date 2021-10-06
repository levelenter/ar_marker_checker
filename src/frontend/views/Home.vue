<template>
  <div class="container">
    <header-navigation />

    <h1>Leaf Proejctへようこそ</h1>
    <p>このプロジェクトはVuejs/Typescript/nodejs/Express をベースとしたLevelenter製フレームワークのテンプレートプロジェクトです。</p>

    <h2>Leafフレームワークの機能</h2>
    <p>Leafフレームワークは、以下のような機能を持ちます</p>
    <ul>
      <li>サーバーサイドにつなげるRESTAPIやDatabaseオブジェクトを自動生成するスクリプト</li>
      <li>フロントエンドでサーバーのServiceメソッドを呼び出すリモートインターフェイスを自動生成。フロントエンドからサービスを型付で呼び出すかのように参照可能</li>
      <li>ダイアログやトースト通知、ページネーション、テーブルなどのUIコンポーネント</li>
      <li>ログインおよびルーティングのテンプレート</li>
      <li>サーバーサイドのエラー処理機構</li>
      <li>サーバーサイドの１メソッド１トランザクションの機構</li>
      <li>自動生成されたデータアクセスオブジェクトで基本的なCRUDを実現</li>
      <li>bootstrap 5 ベース</li>
    </ul>

    <h2>Leafフレームワークのスタートポイント</h2>
    <p>package.jsonのscriptで自動生成やサーバーの起動停止を実行します</p>
    <ul>
      <li>`npm run db` docker-composeを使って開発環境DBを立ち上げます。初期化スクリプトは[/database/init]配下にあります</li>
      <li>`npm run dev:web`開発用のフロントエンドビルドを行います。watchするため開発中は起動し続けてください。</li>
      <li>`npm run dev:sv`開発用のサーバーサイドビルドを行います。watchはできていない（TODO）ため、サーバーサイドのスクリプトを変えたら再起動してください</li>
      <li>
        `npm run
        entity`データベースアクセス用のDAOとentityクラスを自動生成します。[/database/init/create_table.sql]ファイルと[/database/er/db.er.a5sql]ファイルをベースに自動生成します。
      </li>
    </ul>
    <h2>VScodeのスニペット</h2>
    <p>Leaf開発ではVSCodeを利用します。設定→ユーザースニペットで以下のスニペットを登録します。</p>
    <div>
      <pre>
{
  "vue ts composition api": {
    "prefix": "vts3",
    "body": [
      "&lg;template&gt;",
      "  &lg;div&gt;",
      "    {{ title }}",
      "  &lg;/div&gt;",
      "&lg;/template&gt;",
      "&lg;script lang="ts"&gt;",
      "import { defineComponent, ref } from '@vue/runtime-core';",
      "import { useRouter } from 'vue-router';",
      "export default defineComponent({",
      "  components: {},",
      "  props: {},",
      "  setup: () =&gt; {",
      "    /**",
      "     * 動的ラベル",
      "     */",
      "    const title = ref('${TM_FILENAME_BASE:default}')",
      "    /**",
      "     * プロパティ",
      "     */",
      "    const router = useRouter();",
      "",
      "    return {",
      "      title,",
      "    };",
      "  },",
      "});",
      "&lg;/script&gt;"
    ],
    "description": "vue template init"
  },
  "dao ts class": {
    "prefix": "dts",
    "body": [
      "import { ${TM_FILENAME_BASE:default}Gen } from './generated/${TM_FILENAME_BASE:default}Gen';",
      "import { ResultSetHeader } from 'mysql2';",
      "",
      "export class $TM_FILENAME_BASE extends ${TM_FILENAME_BASE:default}Gen {",
      "}"
    ]
  },
  "biz ts class3": {
    "prefix": "bts3",
    "body": [
      "import config from 'config';",
      "import { PoolConnection } from 'mysql2/promise';",
      "import { Transactional } from '../../framework/biz/@Transactional';",
      "import { Rest } from '../../framework/biz/@Rest';",
      "import { Response } from '../../framework/biz/Response';",
      "",
      "export class ${TM_FILENAME_BASE:default} {",
      "  connection!: PoolConnection;",
      "",
      "  @Rest('/v1/${TM_FILENAME_BASE:default}/${1:method}', 'post')",
      "  @Transactional('connection')",
      "  async ${1:method}(): Promise&lt;Response&lt;any&gt;&gt; {",
      "    const result: any = {};",
      "    return new Response&lt;any&gt;(result);",
      "  }",
      "}"
    ]
  },
}
</pre
      >
    </div>

    <core-dialog id="first" title="test">
      <b>test</b>

      <template #footer>
        <b>foot</b>
      </template>
    </core-dialog>

    <core-dialog id="second" title="test2">
      <b>test2</b>

      <template #footer>
        <b>foot2</b>
      </template>
    </core-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import CoreDialog from "@/framework/components/dialog/CoreDialog.vue";
import { DialogHandler } from "@/frontend/components/dialog/DialogHandler";
import HeaderNavigation from "./HeaderNavigation.vue";

export default defineComponent({
  components: {
    HeaderNavigation,
    CoreDialog,
    // Test
  },
  props: {},
  setup: () => {
    const open = () => {
      DialogHandler.showDialog("first");
    };

    const open2 = () => {
      DialogHandler.showDialog("second");
    };

    return {
      open,
      open2,
    };
  },
});
</script>