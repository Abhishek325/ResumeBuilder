<template>
  <div
    :class="`input-field col s12 ${field.col} ${field.class}`"
    :style="{ display: display }"
  >
    <vue-editor
      :id="field.id"
      :editorToolbar="customToolbar"
      v-model="value"
      :placeholder="field.placeholder"
      @input="$emit('input', value)"
    ></vue-editor>
    <label :for="field.id" :class="{ active: field.value }">
      {{ field.label }}</label
    >
  </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
import { EventBus } from "../../../bus/eventBus";

export default {
  components: {
    VueEditor,
  },
  props: {
    field: Object,
    sectionSchema: Object,
  },
  computed: {
    display() {
      return this.field.visible == false ? "none" : "block";
    },
  },
  data() {
    return {
      value: this.field.value,
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
        ["code"],
      ],
    };
  },
  mounted() {
    EventBus.$on("onMultiRecordAdded", (id) => {
      if (this.sectionSchema.id === id) this.value = "";
    });
    EventBus.$on("onFieldAction", (action) => {
      if (action.fields.includes(this.field.id)) {
        this.field[action.prop] = action.value;
      }
    });
  },
};
</script>
