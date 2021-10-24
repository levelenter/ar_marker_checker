<template>
  <div id="upload">
    <!-- データのエンコード方式である enctype は、必ず以下のようにしなければなりません -->
    <form id="upload-form" enctype="multipart/form-data" method="POST">
      <!-- MAX_FILE_SIZE は、必ず 'file' input フィールドより前になければなりません -->
      <input id="fileinput" style="display: none" type="hidden" name="MAX_FILE_SIZE" value="50000000" />

      <!-- input 要素の name 属性の値が、$_FILES 配列のキーになります -->
      <div>ファイル</div>
      <input id="userfile" name="userfile" class="form-control" type="file" :accept="acceptExtentions" @change="upload" />
      <p>対応する拡張子：{{ acceptExtentions }}</p>
      <!-- プログレスバー -->
      <progress id="upload_progress" class="d-block w-100" :value="progress" max="100"></progress>
    </form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core";
import axios from "axios";
import { FileInfo } from "@/server/dto/FileInfo";
import { MessageDialog } from "@/framework/frontend/MessageDialog";
export default defineComponent({
  components: {},
  props: {},
  emits: ["on-uploaded"],
  setup: (_, context) => {
    /**
     * プロパティ
     */
    const progress = ref(0);
    const acceptExtentions = "glb";

    /**
     * プログレスバーの進行
     */
    const onUpload = (e: any) => {
      progress.value = Math.floor((e.loaded * 100) / e.total);
    };

    /**
     * アップロード
     */
    const upload = async (event: Event) => {
      const target = event.target as HTMLInputElement;
      const files = target?.files![0];

      const formData = new FormData();
      formData.append("userfile", files); // サーバーサイドの[user_assets_api.ts->uploadMultの名前と合わせる]
      const url = `./v1/upload_file?file_name=${files.name}`;
      const response = await axios.post(url, formData, { onUploadProgress: onUpload });

      progress.value = 0;
      const fileInfo: FileInfo = response.data.data;
      MessageDialog.info(`${fileInfo.name}`);
      context.emit("on-uploaded", fileInfo);
    };

    return {
      progress,
      upload,
      acceptExtentions,
    };
  },
});
</script>
