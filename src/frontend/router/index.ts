import { Session } from "../../framework/frontend/Session";
import { createRouter, createWebHistory, RouteRecordRaw, RouteLocationNormalized } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import TablePage from "../components/TablePage.vue";
import TopPage from "@/frontend/views/top/TopPage.vue";
import NextPage from "@/frontend/views/top/NextPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requireAuth: false }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requireAuth: false }
  },
  {
    path: "/table_page",
    name: "TablePage",
    component: TablePage,
    meta: { requireAuth: false }
  },
  {
    path: "/next",
    name: "NextPage",
    component: NextPage,
    meta: { requireAuth: true }
  },
  {
    path: "/top_page",
    name: "TopPage",
    component: TopPage,
    meta: { requireAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

/**
 * ユーザータイプによって、ログインページが異なる。
 * 認証なしで入ろうとした時にログインページへ飛ばす。
 * @param type
 * @param to
 */
const getLoginPagePath = (type: string, to: RouteLocationNormalized) => {
  const path = "/";
  return path;
};

router.beforeEach((to: RouteLocationNormalized, from, next) => {
  // console.log('routing', to.fullPath, to.meta, to.matched);

  // メタデータがなければnextに飛ばす（管理対象外のページ）
  to.meta ?? next();

  // 認証されていなければログイン画面出す
  if (to.meta.requireAuth && !Session.isAuthorized) {
    console.log("fullPath", to.fullPath);
    next({ path: "/", query: { redirect: to.fullPath } });
  } else {
    next();
  }
});
export default router;
