<template>
  <div>
    <!-- Modal -->
    <div :id="id" class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" @click.self="$emit('close')">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="staticBackdropLabel" class="modal-title">
              {{ title }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <slot name="footer"></slot>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent, reactive } from "@vue/runtime-core";
const bootstrap = (window as any).bootstrap;

const defaultId = "myModal";
export function showDialog(id = defaultId) {
  const modal = document.getElementById(id);
  if (!modal) return;
  const myModal = new bootstrap.Modal(modal, {
    keyboard: false,
  });
  myModal.show();
}
export default defineComponent({
  props: {
    title: {
      type: String,
      default: "my dialog",
    },
    id: {
      type: String,
      default: defaultId,
    },
  },
  setup: (prop, context) => {
    const props = reactive(prop);
    return {
      props,
      context,
    };
  },
});
</script>