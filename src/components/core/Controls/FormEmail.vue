<template>
  <div :class="`input-field col s12 ${field.col} ${field.class}`">
    <input
      type="email"
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
    EventBus.$on("onMultiRecordAdded", (id) => {
      if (this.sectionSchema.id === id) this.value = "";
    });
  },
};
</script>
