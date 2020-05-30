<template>
  <div :class="`input-field col s12 ${field.col} ${field.class}`">
    <input
      type="text"
      :id="field.id"
      class="validate"
      :placeholder="field.placeholder"
      @input="$emit('input', value)"
      v-model="value"
    />
    <label :for="field.id" :class="{ active: value }"> {{ field.label }}</label>
  </div>
</template>
<script>
import { EventBus } from "../../../bus/eventBus";
export default {
  props: {
    field: Object,
    sectionSchema: Object,
  },
  data() {
    return {
      value: this.field.value,
    };
  },
  mounted() {
    EventBus.$on("onMultiRecordAdded", (sectionName) => {
      if (this.sectionSchema.name === sectionName) this.value = "";
    });
  },
};
</script>
