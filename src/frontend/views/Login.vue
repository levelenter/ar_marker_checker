<template>
  <div>test</div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import firebase from "firebase";
import firebaseui from "firebaseui";

@Options({ components: {} })
export default class Login extends Vue {
  created() {
    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebaseui-auth-container", {
      signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
      // Other config options...
    });
  }
}
</script>