<template>
  <div></div>
</template>
<script lang='ts'>
import { defineComponent, ref } from "@vue/runtime-core";
import { useRouter } from "vue-router";
export default defineComponent({
  components: {},
  props: {},
  setup: () => {
    /**
     * 動的ラベル
     */
    const title = ref("DialogContainer");
    /**
     * プロパティ
     */
    const router = useRouter();

    return {
      title,
    };
  },
});
</script>