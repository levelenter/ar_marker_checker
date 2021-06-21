<template>
  <div>
    <span>表示ページ:{{ currentPage }}/{{ total }}</span>

    <span>表示数:{{ inPageCount }}</span>
    <span>データ総数:{{ rows.length }}</span>

    <div style="overflow: scroll">
      <table class="table table-striped table-hover">
        <thead>
          <th
            v-for="col in columns"
            :key="col.index"
            :width="col.width"
            @click="sort(col, $event)"
          >
            <span v-html="col.label" />
            <i
              v-if="col.up"
              class="fas fa-sort-up"
            />
            <i
              v-if="col.down"
              class="fas fa-sort-down"
            />
          </th>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in inPageRows"
            :key="row.index"
          >
            <td
              v-for="col in columns"
              :key="col.index"
              :class="cellCss(col)"
              @click="onSelectRow(row, $event)"
            >
              <template v-if="col.type === 'date'">
                {{ formatDate(display(row, col)) }}
              </template>
              <template
                v-if="col.type === 'currency'"
                class="text-right"
              >
                {{ formatCurrency(display(row, col)) }}
              </template>
              <span
                v-if="col.type === 'renderfunc'"
                @mouseover="col.onmouseover && col.onmouseover(row, col, $event)"
                v-html="col.representedAs(row)"
              />
              <template v-if="!col.type || col.type === 'none'">
                {{ display(row, col) }}
              </template>
              <template v-if="col.type === 'seq'">
                {{ index + 1 }}
              </template>
              <button
                v-if="col.btnClass"
                :class="col.btnClass"
                @click="
                  col.onclick(row, $event);
                  $event.stopPropagation();
                "
                v-html="col.label"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <ul class="pagination">
      <li
        v-for="index in paginations"
        :key="index"
        class="page-item"
      >
        <button
          class="page-link"
          @click="currentPage = index + 1"
        >
          {{ index + 1 }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { dayjs, DT_FORMAT_JA, D_FORMAT_JA } from "../../util/momentExtends";
import Vue from "vue";
import { computed, defineComponent, onMounted, reactive, ref, toRef, toRefs, watch } from "@vue/runtime-core";
import { TableColumn } from "./TableColumn";

export default defineComponent({
  props: {
    inPageCount: {
      type: Number,
      default: 10,
    },
    columns: {
      type: Array as Vue.PropType<TableColumn[]>,
      required: true,
    },
    rows: {
      type: Array as Vue.PropType<any[]>,
      required: true,
    },
  },
  setup(props, context) {
    // リアクティブなプロパティを初期化する
    const rows = reactive(props.rows);
    const total = ref(1);
    const paginations = ref([0]);
    const currentPage = ref(1);

    const inPageRows = computed(() => {
      const start = (currentPage.value - 1) * props.inPageCount;
      const end = currentPage.value * props.inPageCount;
      console.log(start, end);
      return rows.slice(start, end);
    });

    const formatDate = (dt: Date) => {
      return dayjs(dt).format(DT_FORMAT_JA);
    };
    const formatCurrency = (num: number) => {
      if (!num) return 0;
      return num.toLocaleString("ja");
    };

    const display = (row: any, col: TableColumn) => {
      const name = col.name;
      if (!name) return "";
      if (!name.includes(".")) return row[name];

      const names = name.split(".");
      let value = names.reduce((acum, cur) => acum[cur], row);
      if (col.formatFunc) {
        value = col.formatFunc(value);
      }
      return value;
    };

    /**
     * TDのCSS Classを決める
     */
    const cellCss = (col: TableColumn) => {
      let cssClass = col.tdClass;
      if (!cssClass) cssClass = {};

      const newClass: any = cssClass;
      console.log("aling", col.align);
      if (col.align === "left") {
        newClass["text-left"] = true;
      } else if (col.align === "right") {
        newClass["text-right"] = true;
      } else {
        newClass["align-middle"] = true;
      }
      return newClass;
    };

    const sort = (col: TableColumn, event: Event) => {
      // 他のカラムは一旦クリア
      props.columns.filter((item) => item !== col).forEach((col) => ([col.up, col.down] = [false, false]));

      /**
       * 階層的なプロパティに対応して値を取得
       */
      const colItem = (name: string, value: any) => name.split(".").reduce((object, propName) => object[propName], value);

      /**
       * ソートの関数
       */
      const sortFunc = (isUp: boolean, a: any, b: any, name?: string, sortItem?: string) => {
        const lessThan = (a: any, b: any) => a > b;
        const operator = isUp ? 1 : -1;

        // ソートキーを確定
        const sortKey = col.name ? col.name : col.sortitem;
        if (!sortKey) return 0;

        // null を処理
        if (!colItem(sortKey, a) && !colItem(sortKey, b)) return 0;
        if (!colItem(sortKey, a)) return 1 * operator;
        if (!colItem(sortKey, b)) return -1 * operator;

        // 論理演算
        return lessThan(colItem(sortKey, a), colItem(sortKey, b)) ? 1 * operator : -1 * operator;
      };

      // はじめはup
      if (!col.up || col.down) {
        col.up = true;
        col.down = !col.up;
      } else {
        col.up = false;
        col.down = !col.up;
      }

      rows.sort((a: any, b: any) => {
        return sortFunc(col.up!, a, b, col.name, col.sortitem!);
      });

      console.log("sort in col", col);
    };

    const showPaginations = () => {
      console.log("show pagenation start ", props.rows.length, props.inPageCount);

      if (props.rows.length % props.inPageCount > 0) {
        total.value = Math.floor(props.rows.length / props.inPageCount) + 1;
      } else {
        total.value = Math.floor(props.rows.length / props.inPageCount);
      }
      paginations.value = Array.from({ length: total.value }, (v, k) => k);
    };

    onMounted(() => {
      showPaginations();
    });

    watch(inPageRows, () => {
      showPaginations();
    });

    return {
      total,
      paginations,
      currentPage,
      inPageRows,
      display,
      cellCss,
      sort,
      formatDate,
      formatCurrency,
    };
  },
  methods: {},
});
</script>
