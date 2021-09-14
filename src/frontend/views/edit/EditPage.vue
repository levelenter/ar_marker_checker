<template>
  <div>
    {{ title }}
    <!-- <input type="text" v-model="messageRef" />
    <br />
    {{ messageRef }} -->
    <br />
    <input type="text" v-model="list.quiz_title" id="title" />
    <br />
    <input type="text" v-model="list.quiz_contents" />
    <br />
    <input type="text" v-model="list.quiz_auther" />
    <br />
    <button @click="update">Update</button>
  </div>
</template>
<script lang="ts">
import { LeafQuiz } from "@/server/dto/generated/LeafQuiz";
import { defineComponent, reactive, ref, Ref } from "@vue/runtime-core";
import { useRouter, useRoute } from "vue-router";
import { QuizService } from "../../biz/remote/QuizService";
export default defineComponent({
  components: {},
  props: {},
  setup: (prop, context) => {
    /**
     * 動的ラベル
     */
    const title = ref("EditPage");

    /**
     * プロパティ
     */
    const router = useRouter();
    const route = useRoute();
    const props = reactive(prop);

    const messageRef = ref("");

    const list = ref();

    const init = async () => {
      const biz = new QuizService();
      const result = await biz.getById(1);
      console.log(result);
      list.value = result.data;
    };
    init().then();

    const update = async () => {
      /* const message = `${route.query.selectedId}  : ${list.value.quiz_contents} `;
      alert(message); */
      const biz = new QuizService();
      console.log(biz.quizUpdate());
      const result = await biz.quizUpdate(1, "def", "def", "2");
      console.log(result);
    };
    return {
      list,
      title,
      messageRef,
      update
    };
  }
});
</script>
