<template>
  <div>
    <button @click="gotoTablePage">Goto Table Page</button>
  </div>
</template>
<script lang='ts'>
import { defineComponent, reactive } from "@vue/runtime-core";
import { useRouter } from "vue-router";
export default defineComponent({
  props: {},
  setup: (prop, context) => {
    const router = useRouter();
    const props = reactive(prop);
    const gotoTablePage = () => {
      router.push({ name: "TablePage" });
    };
    return {
      gotoTablePage,
      props,
      context,
    };
  },
});
</script>