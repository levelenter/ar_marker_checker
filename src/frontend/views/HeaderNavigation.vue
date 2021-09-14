<template>
  <header>
    <nav class="d-flex justify-content-between pt-2 my-2">
      <!-- <a href="#"><img src="../../assets/logo.png" height="40" /></a> -->

      <div>
        <a id="sign_in_button" class="btn btn-outline-secondary btn-sm" role="button" href="#" @click="openDialog">ログイン</a>
      </div>

      <login-dialog />
    </nav>
  </header>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "@vue/runtime-core";
import LoginDialog, { showLoginDialog } from "./dialog/LoginDialog.vue";

export default defineComponent({
  components: { LoginDialog },
  props: {},
  setup: (prop, context) => {
    const props = reactive(prop);
    const openDialog = () => {
      showLoginDialog();
    };

    return {
      props,
      context,
      openDialog
    };
  }
});
</script>
