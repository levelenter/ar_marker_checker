<template>
  <div>
    <core-dialog :id="dialogId" title="ログイン">
      <div class="">
        <div class="d-flex my-2">
          <label class="w-25" for="mail">メールアドレス</label>
          <input id="mail" v-model="user.mail" type="text" class="form-controll w-75" placeholder="デモユーザー => admin@example.com" />
        </div>
        <div class="d-flex">
          <label class="w-25" for="password">パスワード</label>
          <input id="password" v-model="user.password" type="password" class="form-controll w-75" placeholder="デモユーザーパス => admin" />
        </div>
      </div>
      <template #footer>
        <button class="btn btn-primary" data-bs-dismiss="modal">閉じる</button>
        <button class="btn btn-primary" @click.self="login">ログイン</button>
      </template>
    </core-dialog>
  </div>
</template>
<script lang="ts">
import CoreDialog from "@/framework/components/dialog/CoreDialog.vue";
import { defineComponent, reactive } from "@vue/runtime-core";
import { AuthService } from "../../biz/remote/AuthService";
import { useRoute, useRouter } from "vue-router";
import { Session } from "@/framework/frontend/Session";
import { MessageDialog } from "@/framework/frontend/MessageDialog";
import { DialogHandler } from "@/frontend/components/dialog/DialogHandler";
export default defineComponent({
  components: { CoreDialog },
  props: {},
  setup: (prop, context) => {
    const user = reactive({
      mail: "",
      password: "",
    });
    const router = useRouter();
    const route = useRoute();

    const dialogId = DialogHandler.singInDialogId;
    const props = reactive(prop);
    const login = async () => {
      try {
        const service = new AuthService();

        const result = await service.login(user.mail, user.password);

        // ログインエラーならFrameworkでエラーが出る
        if (result.hasError) {
          await MessageDialog.error(result.errorDescription);
          console.log(user);
          return;
        }
        Session.set("USER", result.data);
        DialogHandler.hideDialog(dialogId);
        const redirectPath = (route.params.redirect as string) || `/top_page`;
        router.push(redirectPath);
      } catch (e) {
        await MessageDialog.error(e);
      }
    };
    return {
      login,
      dialogId,
      props,
      user,
      context,
    };
  },
});
</script>
