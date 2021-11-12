<template>
  <div class="container">
    <div>
      1. 以下のマーカー生成サイトで「UPLOAD」ボタンからファイルをアップロードして、ARマーカーを生成してください。<br />
      <a target="_blank" href="https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html"
        >https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html</a
      >
    </div>

    <div class="mt-4">
      <p>2.マーカー生成サイトの「DOWNLOAD MARKER」ボタンからpattファイルをダウンロードして、以下にアップロードしてください。</p>
      <file-upload-section accept-extentions="patt" title="マーカーパターン" @on-uploaded="onUpload" />
    </div>

    <div v-if="pattFileName" class="d-flex">
      <div class="me-3">ファイル名</div>
      <div>{{ pattFileName }}</div>
    </div>

    <div class="mt-4">
      <p>3.マーカー生成サイトの「DOWNLOAD IMAGE」ボタンからpngファイルをダウンロードして、以下にアップロードしてください。</p>
      <file-upload-section accept-extentions="png" title="マーカーイメージ" @on-uploaded="onUploadImage" />
    </div>

    <div>
      <div v-show="pattFileName && imgFileName" class="border border-secondary rounded p-3 my-3">
        <div class="d-flex mt-3">
          QRコードを開いてスマートフォンなどで読み取り、画面上のマーカーを読み取ってください。
          うまく読み取れない場合は、スマートフォンのブラウザをリロードすると読み取れるようになることがあります。
        </div>

        <div v-if="pattFileName" class="d-flex mt-3">
          <div><button class="btn btn-primary me-3" @click="openArQr">Marker ARのQRを開く</button></div>
          <div><button class="btn btn-primary" @click="openArOther">別ウインドウでMarker ARを開く</button></div>
        </div>

        <div class="d-flex mt-3 w-100">
          <iframe v-show="pattFileName" id="ar" :src="arUrl" class="w-50" style="height: 30rem"> </iframe>

          <div class="d-flex justify-content-center align-items-center w-50 p-5" style="height: 30rem">
            <img v-show="pattFileName" :src="imgFileName" class="w-100" />
          </div>
        </div>
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
  },
  props: {},
  setup: () => {
    const arPath = "public/ar.html";
    const pattFileName = ref("");
    const imgFileName = ref("");
    const arUrl = ref(arPath);

    const onUpload = (fileInfo: FileInfo) => {
      pattFileName.value = fileInfo.name;
      const ar = document.getElementById("ar") as HTMLIFrameElement;
      ar.contentWindow?.postMessage(fileInfo.name, "*");
    };

    const onUploadImage = (fileInfo: FileInfo) => {
      imgFileName.value = "./uploaded/" + fileInfo.name;
      console.log("info");
    };

    const locationTo = () => location.protocol + "//" + location.host + location.pathname;
    const getARPath = () => locationTo() + arPath + `?fileName=${pattFileName.value}`;
    const openArQr = () => {
      DialogHandler.qrData = getARPath();
      DialogHandler.showQrDialog();
    };
    const openArOther = () => window.open(getARPath(), "_blank");

    return { onUpload, pattFileName, imgFileName, arUrl, onUploadImage, openArQr, openArOther };
  },
});
</script>
<style scoped>
.snippet {
  border: 0.1rem solid grey;
  padding: 1rem;
}
</style>