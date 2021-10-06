import { createApp } from "vue";
import App from "./views/App.vue";
import router from "./router";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Notifications from "@kyvg/vue3-notification";

// Bundleじゃないとpopperがはいっていないので、ドロップダウンなどが効かなくなる
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { MessageDialog } from "../framework/frontend/MessageDialog";

window.onerror = (message, file, line) => {
  MessageDialog.systemError("不明な箇所", "[システムエラー]", `が発生しました line ${line} file ${file} message ${message}`);
};

export const vue = createApp(App);
vue.use(router);
vue.use(Notifications);
export const mounted = vue.mount("#app");
