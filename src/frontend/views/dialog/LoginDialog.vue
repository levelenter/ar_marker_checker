<template>
  <div>
    <core-dialog title="ログイン">
      <div class="">
        <div class="d-flex my-2">
          <label class="w-25" for="mail">Email</label>
          <input id="mail" v-model="user.mail" type="text" class="form-controll w-75" />
        </div>
        <div class="d-flex">
          <label class="w-25" for="password">パスワード</label>
          <input id="password" v-model="user.password" type="password" class="form-controll w-75" />
        </div>
      </div>
      <template #footer>
        <button class="btn btn-primary" data-bs-dismiss="modal">閉じる</button>
        <button class="btn btn-primary" @click.self="login">ログイン</button>
      </template>
    </core-dialog>
  </div>
</template>
<script lang='ts'>
import CoreDialog, { hideDialog } from "@/framework/components/dialog/CoreDialog.vue";
import { defineComponent, reactive, toRefs } from "@vue/runtime-core";
import { AuthService } from "../../biz/remote/AuthService";
import { useRouter } from "vue-router";
import { Session } from "@/framework/frontend/Session";
import { MessageDialog } from "@/framework/frontend/MessageDialog";
export default defineComponent({
  components: { CoreDialog },
  props: {},
  setup: (prop, context) => {
    const user = reactive({
      mail: "",
      password: "",
    });
    const router = useRouter();
    console.log(router);

    const props = reactive(prop);
    const login = async () => {
      const service = new AuthService();
      const result = await service.login(user.mail, user.password);

      // ログインエラーならFrameworkでエラーが出る
      if (result.hasError) {
        await MessageDialog.alertModal(result.errorDescription);
        return;
      }
      Session.set("USER", result.data);
      hideDialog();

      const redirectPath = new URLSearchParams(location.search).get("redirect") || `/top_page`;
      router.push(redirectPath);
    };
    return {
      login,
      props,
      user,
      context,
    };
  },
});
</script>