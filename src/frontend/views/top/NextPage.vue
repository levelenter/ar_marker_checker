<template>
  <div>
    next
    <div>{{ props }}</div>
    <div>{{ context }}</div>
  </div>
</template>
<script lang='ts'>
import { defineComponent, reactive } from "@vue/runtime-core";
export default defineComponent({
  props: {},
  setup: (prop, context) => {
    const props = reactive(prop);

    return {
      props,
      context,
    };
  },
});
</script>