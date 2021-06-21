import LeafTable from "../framework/components/table/LeafTable.vue";
import { TableColumn } from "../framework/components/table/TableColumn";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "LeafProject/Button",
  component: LeafTable,
  argTypes: {}
};

const Template = args => ({
  // Components used in your story `template` are defined in the `components` object
  components: { LeafTable },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    const rows: { id: number; name: string; price: number; create: Date }[] = [];
    for (let i = 1; i <= 20; i++) {
      rows.push({ id: i, name: `item ${i}`, price: i * 1000000, create: new Date() });
    }

    const cols: TableColumn[] = [
      { label: "id", name: "id" },
      { label: "name", name: "name" },
      { label: "price", name: "price", type: "currency" },
      { label: "create data", name: "create", type: "date" }
    ];

    return {
      rows,
      cols
    };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<LeafTable :rows="rows" :columns="cols" />'
});

export const Table = Template.bind({});
Table.args = {};
