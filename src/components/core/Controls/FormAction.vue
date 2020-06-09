<template>
  <div
    :class="`input-field col s12 ${field.col} ${field.class}`"
    :style="{ display: display }"
  >
    <a
      v-if="field.actionType === 'show'"
      class="waves-effect btn-flat show-btn add-new"
      @click="onShow()"
    >
      <i class="material-icons">add </i>
      {{ field.label }}</a
    >
    <a
      v-else
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
    display() {
      return this.field.visible == false ? "none" : "block";
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
    onShow() {
      this.field.visible = false;
      EventBus.$emit("onFieldAction", this.field.action);
    },
  },
  mounted() {
    EventBus.$on("onFieldAction", (action) => {
      if (action.fields.includes(this.field.id)) {
        this.field[action.prop] = action.value;
      }
    });
  },
};
</script>
<style scoped>
.btn-flat {
  margin-bottom: 0.4rem;
}
.show-btn {
  padding-bottom: 3rem;
  background: transparent;
  text-transform: capitalize;
  font-weight: 600;
  width: 100%;
}
.show-btn > i {
  position: relative;
  top: 5px;
}
</style>
