<template>
  <div :class="`input-field col s12 ${field.col} ${field.class}`">
    <input
      type="text"
      :id="field.id"
      :name="field.id"
      :class="{
        'is-invalid invalid mt-1': errors.has(
          `section_${sectionSchema.id}.${field.id}`
        ),
      }"
      :data-vv-scope="`section_${sectionSchema.id}`"
      v-validate="field.validations"
      :placeholder="field.placeholder"
      @input="$emit('input', value)"
      @blur="validate()"
      v-model="value"
    />
    <label :for="field.id" :class="{ active: value }"> {{ field.label }}</label>
    <span
      v-show="errors.has(`section_${sectionSchema.id}.${field.id}`)"
      class="is-invalid right"
    >
      {{ errors.first(`section_${sectionSchema.id}.${field.id}`) }}
    </span>
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
  async mounted() {
    EventBus.$on("onMultiRecordAdded", (id) => {
      if (this.sectionSchema.id === id) this.value = "";
      this.$validator.reset();
    });
    EventBus.$on("showValidationErrors", (id) => {
      if (this.sectionSchema.id === id) this.validate();
    });
  },
  methods: {
    async validate() {
      await this.$validator.validateAll("section_" + this.sectionSchema.id);
    },
  },
};
</script>
<style scoped>
.input-field {
  height: 54px;
}
.mt-1 {
  margin-top: 0.25rem !important;
}
</style>
