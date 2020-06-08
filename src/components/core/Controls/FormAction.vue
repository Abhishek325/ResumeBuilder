<template>
  <div :class="`input-field col s12 ${field.col} ${field.class}`">
    <a
      class="waves-effect center-align btn-flat add-new"
      :disabled="isInvalid"
      @click="addMutliRecord()"
      @mousedown="validate()"
    >
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
  computed: {
    isInvalid() {
      return (
        this.$validator.errors.items.filter(
          (i) => i.scope === "section_" + this.sectionSchema.id
        ).length > 0
      );
    },
  },
  methods: {
    validate() {
      EventBus.$emit("showValidationErrors", this.sectionSchema.id);
    },
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
