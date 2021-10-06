<template>
  <main class="container">
    <h1>{{ title }}</h1>
    <div class="row gy-3">
      <div v-for="item of currentPageRows" :key="item.id" class="col-xs-6 col-md-4 col-lg-3 gx-2">
        <div class="card">
          <div class="card-title">{{ item.name }}</div>
          <div class="card-body">
            <div>ID : {{ item.id }}</div>
            <div class="mt-2">Date: {{ formatDate(item.create) }}</div>
            <div class="mt-2">Price: {{ formatPrice(item.price) }}</div>
          </div>
        </div>
      </div>
      <page-nation :full-rows="fullRows" :page-size="10" @on-page-changed="pageCanged" />
    </div>
  </main>
</template>
<script lang='ts'>
import PageNation from "@/framework/components/table/PageNation.vue";
import { dayjs, DT_FORMAT_JA } from "@/framework/util/momentExtends";
import { defineComponent, ref } from "@vue/runtime-core";
export default defineComponent({
  components: { PageNation },
  props: {},
  setup: () => {
    /**
     * 動的ラベル
     */
    const title = ref("PageingedList");

    // ちゃんとクラスとして行の型を作ってもいい、この場合ダミーデータ用の一時的な型なのでローカルで作ってる
    type MyRowType = { id: number; name: string; price: number; create: Date };

    /**
     * ダミーデータを作る
     */
    const fullRows: MyRowType[] = [];
    for (let i = 1; i <= 20; i++) {
      fullRows.push({ id: i, name: `item ${i}`, price: i * 1000000, create: new Date() });
    }

    // ページ変更時のイベント
    const currentPageRows = ref([] as any);
    const pageCanged = (rowsInPage: MyRowType[], currentPage: number) => {
      currentPageRows.value = rowsInPage;
    };

    /**
     * フォーマット関数
     */
    const formatPrice = (num: number) => {
      return `¥${num.toLocaleString("ja")}`;
    };
    const formatDate = (dt: Date) => {
      return dayjs(dt).format(DT_FORMAT_JA);
    };

    return {
      title,
      fullRows,
      pageCanged,
      currentPageRows,
      formatPrice,
      formatDate,
    };
  },
});
</script>