<template>
  <div>
    <div class="signup">
      <div id="firebaseui-auth-container"></div>
    </div>
    <Dialog />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import firebase from "firebase";
import firebaseui from "firebaseui-ja";

// import Dialog from "../../framework/components/dialog/Dialog.vue";
import { useRouter } from "vue-router";
require("firebaseui-ja/dist/firebaseui.css");

export default defineComponent({
  // components: { Dialog },
  props: {},
  setup: (prop, context) => {
    const props = reactive(prop);

    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebaseui-auth-container", {
      callbacks: {
        uiShown: function () {
          console.log("uiShown");
        },
        signInSuccessWithAuthResult: (authResult, redirectUrl) => {
          console.log("signInSuccessWithAuthResult", authResult, redirectUrl);

          const isNewUser = authResult.additionalUserInfo.isNewUser;
          let displayName = authResult.user.displayName;
          let photoURL = authResult.user.photoURL;

          // SNSログイン＆で登録済みであればスキップ
          if (displayName != "ゲスト" && !isNewUser) {
            return true;
          }

          // プロバイダ別のプロファイル取得
          switch (authResult.additionalUserInfo.providerId) {
            case firebase.auth.GoogleAuthProvider.PROVIDER_ID:
              displayName = authResult.additionalUserInfo.profile.name;
              photoURL = authResult.additionalUserInfo.profile.picture;
              break;
            case firebase.auth.FacebookAuthProvider.PROVIDER_ID:
              displayName = authResult.additionalUserInfo.profile.name;
              photoURL = authResult.additionalUserInfo.profile.picture.data.url;
              break;
            case firebase.auth.TwitterAuthProvider.PROVIDER_ID:
              displayName = authResult.additionalUserInfo.profile.name;
              photoURL = authResult.additionalUserInfo.profile.profile_image_url;
              break;
            case firebase.auth.GithubAuthProvider.PROVIDER_ID:
              displayName = authResult.additionalUserInfo.profile.name;
              photoURL = authResult.additionalUserInfo.profile.avatar_url;
              break;
            default:
              displayName = "ゲスト";
              photoURL = "";
              break;
          }

          const user = {
            displayName: displayName,
            photoURL: photoURL,
          };

          firebase
            .auth()
            .currentUser!.updateProfile(user)
            .then((res) => {
              console.log("Auth登録完了", res);
              alert("ログインしました。");
              // vm.$router.go();
              const router = useRouter();
              router.push("DashboardPage");
            });
          return true;
        },
        signInFailure: async (error) => {
          console.log("signInFailure", error);
          alert(error.message);
          // vm.$router.go();
        },
      },
      autoUpgradeAnonymousUsers: true,
      signInFlow: "redirect",
      signInSuccessUrl: "/",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
      ],
    });

    return {
      props,
      context,
    };
  },
});
</script>
