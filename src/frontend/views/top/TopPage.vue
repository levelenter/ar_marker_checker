<template>
  <div>
    <ul>
      <li v-for="item of list" :key="item.quiz_id">{{ item.quiz_title }} {{ item.quiz_contents }}</li>
    </ul>
    <button @click="gotoTablePage">Goto Table Page</button><br />
    <button @click="gotoEditPage">Goto Edit Page</button>
  </div>
</template>
<script lang="ts">
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
    const gotoEditPage = () => {
      router.push({ name: "EditPage", query: { selectedId: "aaa" } });
    };
    const list: Ref<LeafQuiz[]> = ref([]);

    const init = async () => {
      const biz = new QuizService();
      const result = await biz.getAll();
      console.log(result);
      list.value = result.data;
    };

    // Promiseをただただよぶ
    init().then();

    return {
      list,
      gotoTablePage,
      gotoEditPage
    };
  }
});
</script>
