<template>
  <div class="container">
    <file-upload-section @on-uploaded="onUpload" />
    <div v-if="fileName">
      <div class="me-3">プレビュー</div>
      <div>{{ fileName }}</div>
    </div>
    <div v-if="fileName" class="d-flex">
      <div><button class="btn btn-primary" @click="openArQr">ARのQRを開く</button></div>
      <div><button class="btn btn-primary" @click="openVrQr">VRのQRを開く</button></div>
      <div><button class="btn btn-primary" @click="openArOther">別ウインドウでARを開く</button></div>
      <div><button class="btn btn-primary" @click="openVrOther">別ウインドウでVRを開く</button></div>
    </div>
    <div class="d-flex">
      <iframe v-show="fileName" id="ar" :src="arUrl" style="height: 30rem; width: 60rem"> </iframe>
      <iframe v-show="fileName" id="vr" :src="vrUrl" style="height: 30rem; width: 60rem"> </iframe>
    </div>
  </div>
</template>

<script lang="ts">
import { FileInfo } from "@/server/dto/FileInfo";
import { defineComponent, ref } from "@vue/runtime-core";
import { DialogHandler } from "../components/dialog/DialogHandler";
import FileUploadSection from "./uploader/FileUploadSection.vue";

export default defineComponent({
  components: {
    FileUploadSection,
    // Test
  },
  props: {},
  setup: () => {
    const arPath = "public/ar.html";
    const vrPath = "public/vr.html";
    const fileName = ref("");
    const arUrl = ref(arPath);
    const vrUrl = ref(vrPath);

    const onUpload = (fileInfo: FileInfo) => {
      fileName.value = fileInfo.name;

      const ar = document.getElementById("ar") as HTMLIFrameElement;
      ar.contentWindow?.postMessage(fileInfo.name, "*");
      const vr = document.getElementById("vr") as HTMLIFrameElement;
      vr.contentWindow?.postMessage(fileInfo.name, "*");
    };

    const locationTo = (() => {
      return location.protocol + "//" + location.host + location.pathname;
    })();
    const openArQr = () => {
      DialogHandler.qrData = locationTo + arPath + `?fileName=${fileName.value}`;
      DialogHandler.showQrDialog();
    };
    const openVrQr = () => {
      DialogHandler.qrData = locationTo + vrPath + `?fileName=${fileName.value}`;
      DialogHandler.showQrDialog();
    };

    const openArOther = () => {
      window.open("../" + arPath + `?fileName=${fileName.value}`, "_blank");
    };
    const openVrOther = () => {
      window.open("../" + vrPath + `?fileName=${fileName.value}`, "_blank");
    };

    return { onUpload, fileName, arUrl, vrUrl, openArQr, openVrQr, openArOther, openVrOther };
  },
});
</script>
<style scoped>
.snippet {
  border: 0.1rem solid grey;
  padding: 1rem;
}
</style>