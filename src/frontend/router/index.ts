import { Session } from "../../framework/frontend/Session";
import { createRouter, createWebHistory, RouteRecordRaw, RouteLocationNormalized } from "vue-router";
import Home from "../views/Home.vue";
import TablePage from "@/frontend/views/table/TablePage.vue";
import TopPage from "@/frontend/views/top/TopPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requireAuth: false }
  },
  {
    path: "/table_page",
    name: "TablePage",
    component: TablePage,
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

router.beforeEach((to: RouteLocationNormalized, from, next) => {
  // console.log('routing', to.fullPath, to.meta, to.matched);

  // メタデータがなければnextに飛ばす（管理対象外のページ）
  to.meta ?? next();

  // 認証されていなければログイン画面出す
  if (to.meta.requireAuth && !Session.isAuthorized) {
    // console.log("fullPath", to.fullPath);
    next({ path: "/", query: { redirect: to.fullPath } });
  } else {
    next();
  }
});
export default router;
