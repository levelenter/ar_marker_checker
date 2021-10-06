<template>
  <router-view />
  <dialog-container />
</template>
<script lang='ts'>
import { defineComponent } from "@vue/runtime-core";
import DialogContainer from "./dialog/DialogContainer.vue";
export default defineComponent({
  components: { DialogContainer },
});
</script>
