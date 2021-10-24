<template>
  <core-dialog :id="dialogId" :dialog-class="{ 'modal-sm': true }" :title="title">
    <div class="d-flex justify-content-center">
      <canvas id="canvas" width="300px" height="300px"></canvas>
    </div>
    <div class="text-center">{{ qrData }}</div>
  </core-dialog>
</template>
<script lang='ts'>
import { defineComponent, onMounted, ref } from "@vue/runtime-core";
import CoreDialog from "@/framework/components/dialog/CoreDialog.vue";
import { DialogHandler } from "./DialogHandler";
import qrcode from "qrcode";
export default defineComponent({
  components: { CoreDialog },
  props: {},
  setup: () => {
    const dialogId = DialogHandler.qrDialogId;
    const title = "QR Code";
    const qrData = ref(DialogHandler.qrData);
    onMounted(() => {
      DialogHandler.onOpenDialog(dialogId, (e: Event) => {
        const canvas = document.getElementById("canvas");

        if (DialogHandler.qrData !== "") {
          qrData.value = DialogHandler.qrData;
        } else {
          qrData.value = location.href;
        }
        qrcode.toCanvas(canvas, qrData.value, function (error: any) {
          if (error) console.error(error);
          console.log("success!");
        });
      });
    });
    return {
      title,
      qrData,
      dialogId,
    };
  },
});
</script>