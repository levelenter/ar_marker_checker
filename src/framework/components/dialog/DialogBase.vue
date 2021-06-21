<template>
  <div>
    <div
      class="modal"
      tabindex="-1"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Modal title
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>Modal body text goes here.</p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent, reactive } from "@vue/runtime-core";
export default defineComponent({
  props: {},
  setup: (prop, context) => {
    const props = reactive(prop);

    const myModal = document.getElementById("myModal");
    const myInput = document.getElementById("myInput");
    if (!myModal) {
      throw Error(`ダイアログが取得できませんでした。`);
    }
    if (!myInput) {
      throw Error(`インプットが取得できませんでした。`);
    }
    myModal.addEventListener("shown.bs.modal", function () {
      myInput.focus();
    });

    return {
      props,
      context,
    };
  },
});
</script>