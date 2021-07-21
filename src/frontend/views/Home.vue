<template>
  <div>
    <!-- <Test user="Test" @input="dataLoad" /> -->
    <header-navigation />

    <p>[{{ message }}]</p>

    <button @click="open">Dialog test</button>

    <button @click="open2">Dialog2 test</button>

    <core-dialog title="test">
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
import Test from "../components/Test.vue";
import { defineComponent, reactive, toRef, toRefs } from "@vue/runtime-core";
import CoreDialog, { showDialog } from "@/framework/components/dialog/CoreDialog.vue";
import HeaderNavigation from "./HeaderNavigation.vue";

export default defineComponent({
  components: {
    HeaderNavigation,
    CoreDialog,
    // Test
  },
  props: {},
  setup: (prop, context) => {
    const message = toRefs({});
    // const service = new TestService();
    // service.getByNote("test").then((data) => {
    //   message = data;
    // });

    const props = reactive(prop);
    // const dataLoad = (data: any) => {
    //   message = data;
    // };
    const open = () => {
      showDialog();
    };

    const open2 = () => {
      showDialog("second");
    };

    return {
      open,
      open2,
      // dataLoad,
      message,
      props,
      context,
    };
  },
});
</script>