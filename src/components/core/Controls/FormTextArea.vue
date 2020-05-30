<template>
  <div :class="`input-field col s12 ${field.col} ${field.class}`">
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
    EventBus.$on("onMultiRecordAdded", (sectionName) => {
      if (this.sectionSchema.name === sectionName) this.value = "";
    });
  },
};
</script>
