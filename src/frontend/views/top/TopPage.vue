<template>
  <div class="container">
    <h1>テストページ</h1>
    <div class="my-3">
      <ul>
        <li v-for="item of list" :key="item.quiz_id">{{ item.quiz_title }} {{ item.quiz_contents }}</li>
      </ul>
      <input v-model="id" type="text" />
    </div>
    <div class="d-flex">
      <button class="btn btn-primary me-2" @click="gotoTablePage">Goto Table Page</button><br />
      <button class="btn btn-primary me-2" @click="gotoEditPage">Goto Edit Page</button>
      <button class="btn btn-primary me-2" @click="gotoPagingPage">Goto Edit Page Nation</button>
    </div>

    <div class="d-flex">
      <button class="btn btn-primary me-2" @click="primaryDialog">基本ダイアログ</button>
      <button class="btn btn-danger me-2" @click="dangerDialog">エラーダイアログ</button><br />
      <button class="btn btn-info me-2" @click="infoDialog">情報ダイアログ</button>
      <button class="btn btn-default me-2" @click="modalAlertDialog">モーダル警告ダイアログ</button>
      <button class="btn btn-secondary me-2" @click="modalPromptDialog">モーダル入力ダイアログ</button>
    </div>
  </div>
</template>
<script lang="ts">
import { MessageDialog } from "@/framework/frontend/MessageDialog";
import { LeafQuiz } from "@/server/dto/generated/LeafQuiz";
import { defineComponent, reactive, ref, Ref } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { QuizService } from "../../biz/remote/QuizService";

export default defineComponent({
  props: {},
  setup: () => {
    const router = useRouter();
    const gotoTablePage = () => {
      router.push({ name: "TablePage" });
    };

    const list: Ref<LeafQuiz[]> = ref([]);
    const id = ref();
    const gotoEditPage = () => {
      router.push({ name: "EditPage", query: { selectedId: id.value } });
    };

    const gotoPagingPage = () => {
      router.push({ name: "PagedList" });
    };

    const init = async () => {
      const biz = new QuizService();
      const result = await biz.getAll();
      console.log(result);
      list.value = result.data;
    };

    const primaryDialog = () => {
      MessageDialog.alert(`alert ダイアログ`);
    };
    const infoDialog = () => {
      MessageDialog.info(`info ダイアログ`);
    };
    const dangerDialog = () => {
      MessageDialog.error(`error ダイアログ`);
    };
    const modalAlertDialog = () => {
      MessageDialog.alertModal(`モーダル ダイアログ`);
    };
    const modalPromptDialog = () => {
      const input = MessageDialog.prompt(`入力ダイアログ`);
      if (input) {
        MessageDialog.alert(input);
      } else {
        MessageDialog.error("入力してください");
      }
    };

    // Promiseをただただよぶ
    init().then();

    return {
      id,
      list,
      primaryDialog,
      infoDialog,
      dangerDialog,
      modalAlertDialog,
      modalPromptDialog,
      gotoTablePage,
      gotoEditPage,
      gotoPagingPage,
    };
  },
});
</script>
