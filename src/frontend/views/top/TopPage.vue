<template>
  <div>
    <div>{{ props }}</div>
    <div>{{ context }}</div>
    <button @click="next">next</button>
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
    const next = () => {
      router.push("/next");
    };
    return {
      next,
      props,
      context,
    };
  },
});
</script>