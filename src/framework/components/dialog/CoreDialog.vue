<template>
  <div>
    <div :id="id" class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" @click.self="$emit('close')">
      <div class="modal-dialog zindex-modal modal-fullscreen-md-down" :class="dialogClass">
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
            <slot name="footer">
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">CLOSE</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
// import { MessageDialog } from '../../framework/frontend/MessageDialog';
import { defineComponent, reactive } from '@vue/runtime-core';
const defaultId = 'myModal';

export default defineComponent({
  props: {
    title: {
      type: String,
      default: 'my dialog',
    },
    id: {
      type: String,
      default: defaultId,
    },
    dialogClass: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  emits: ['close'],
  setup: (prop, context) => {
    const props = reactive(prop);
    return {
      props,
      context,
    };
  },
});
</script>
