<template>
  <div :class="`input-field col s12 ${field.col} ${field.class}`">
    <a class="waves-effect center-align btn-flat" @click="addMutliRecord()">
      {{ field.label }}</a
    >
  </div>
</template>
<script>
import { EventBus } from "../../../bus/eventBus";
export default {
  props: {
    field: Object,
    sectionSchema: Object,
  },
  methods: {
    addMutliRecord() {
      this.$store.commit("setNewMultiRecord", {
        type: this.sectionSchema.name.toLowerCase(),
      });
      EventBus.$emit("onMultiRecordAdded", this.sectionSchema.name);
    },
  },
};
</script>
<style scoped>
.btn-flat {
  background: #ddd;
  margin-bottom: 0.4rem;
}
</style>
