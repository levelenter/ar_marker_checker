<template>
  <div class="container">
    <file-upload-section @on-uploaded="onUpload" />
    <div v-if="fileName">
      <div class="me-3">プレビュー</div>
      <div>{{ fileName }}</div>
    </div>

    <div>
      <div v-show="fileName" class="border border-secondary rounded p-3 my-3">
        <div v-if="fileName" class="d-flex mt-3">
          <div><button class="btn btn-primary me-3" @click="openArQr">Marker ARのQRを開く</button></div>
          <div><button class="btn btn-primary" @click="openArOther">別ウインドウでMarker ARを開く</button></div>
        </div>

        <div class="d-flex mt-3 w-100">
          <iframe v-show="fileName" id="ar" :src="arUrl" class="w-50" style="height: 30rem"> </iframe>
          <div class="d-flex justify-content-center align-items-center w-50 p-5" style="height: 30rem">
            <img v-show="fileName" :src="'../public/hero_ar.png'" class="w-100" />
          </div>
        </div>
      </div>

      <div v-show="fileName" class="border border-secondary rounded p-3 my-3">
        <div v-if="fileName" class="d-flex mt-3">
          <div><button class="btn btn-primary me-3" @click="openVrQr">VRのQRを開く</button></div>
          <div><button class="btn btn-primary" @click="openVrOther">別ウインドウでVRを開く</button></div>
        </div>

        <iframe v-show="fileName" id="vr" class="mt-3 w-100" style="height: 30rem" :src="vrUrl"> </iframe>
      </div>

      <div v-show="fileName" class="border border-secondary rounded p-3 my-3">
        <div v-if="fileName" class="d-flex mt-3">
          <div><button class="btn btn-primary me-3" @click="openMvQr">床面検知ARのQRを開く</button></div>
          <div><button class="btn btn-primary" @click="openMvOther">別ウインドウで床面検知ARを開く</button></div>
        </div>
        <iframe v-show="fileName" id="mv" class="border border-secondary mt-3 w-100" style="height: 30rem" :src="mvUrl"> </iframe>
      </div>
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
    const mvPath = "public/mv.html";
    const fileName = ref("");
    const arUrl = ref(arPath);
    const vrUrl = ref(vrPath);
    const mvUrl = ref(mvPath);

    const onUpload = (fileInfo: FileInfo) => {
      fileName.value = fileInfo.name;
      const ar = document.getElementById("ar") as HTMLIFrameElement;
      ar.contentWindow?.postMessage(fileInfo.name, "*");
      const vr = document.getElementById("vr") as HTMLIFrameElement;
      vr.contentWindow?.postMessage(fileInfo.name, "*");
      const mv = document.getElementById("mv") as HTMLIFrameElement;
      mv.contentWindow?.postMessage(fileInfo.name, "*");
    };

    const locationTo = () => location.protocol + "//" + location.host + location.pathname;
    const getARPath = () => locationTo() + arPath + `?fileName=${fileName.value}`;
    const getVRPath = () => locationTo() + vrPath + `?fileName=${fileName.value}`;
    const getMVPath = () => locationTo() + mvPath + `?fileName=${fileName.value}`;

    const openArQr = () => {
      DialogHandler.qrData = getARPath();
      DialogHandler.showQrDialog();
    };
    const openVrQr = () => {
      DialogHandler.qrData = getVRPath();
      DialogHandler.showQrDialog();
    };
    const openMvQr = () => {
      DialogHandler.qrData = getMVPath();
      DialogHandler.showQrDialog();
    };

    const openArOther = () => window.open(getARPath(), "_blank");
    const openVrOther = () => window.open(getVRPath(), "_blank");
    const openMvOther = () => window.open(getMVPath(), "_blank");

    return { onUpload, fileName, arUrl, vrUrl, mvUrl, openArQr, openVrQr, openArOther, openVrOther, openMvQr, openMvOther };
  },
});
</script>
<style scoped>
.snippet {
  border: 0.1rem solid grey;
  padding: 1rem;
}
</style>