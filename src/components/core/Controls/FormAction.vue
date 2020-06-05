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
        sectionSchema: this.sectionSchema,
      });
      EventBus.$emit("onMultiRecordAdded", this.sectionSchema.id);
    },
  },
};
</script>
<style scoped>
.btn-flat {
  margin-bottom: 0.4rem;
}
</style>
