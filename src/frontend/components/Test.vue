<template>
  <div>
    {{ message }}
    {{ dataList }}

    propData:{{ prop.user }}<br />
    sum:{{ sum }}
    <button @click="pushButton">count u p</button>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  toRefs,
  watch,
} from "@vue/runtime-core";

export default defineComponent({
  props: {
    user: {
      type: String,
      required: true,
    },
  },
  setup(prop, context) {
    // refは値をリアクティブにする、値の取得や設定にはvalueプロパティを使う
    const message = ref<string>("test");

    // reactive はネストされたオブジェクトのプロパティをリアクティブにする値の取得や設定でvalueはいらない
    const dataList = reactive<{ id: number; name: string }[]>([
      { id: 0, name: "坂本" },
      { id: 1, name: "田中" },
      { id: 2, name: "鈴木" },
    ]);
    const count = ref<number>(0);
    const sum = ref<number>(0);

    // メソッド定義
    const pushButton = () => {
      count.value++;
      dataList[count.value % 3].id = count.value;
      message.value = `name:${dataList[count.value % 3].name} id:${
        dataList[count.value % 3].id
      }`;
      context.emit("input", count.value);
    };

    watch(count, () => {
      sum.value = count.value * 2;
    });

    return {
      message,
      count,
      dataList,
      pushButton,
      prop,
      sum,
    };
  },
});
</script>