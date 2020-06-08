<template>
  <ValidationObserver ref="observer">
    <component
      :is="field.type"
      :field="field"
      :sectionSchema="sectionSchema"
      @input="onInput($event)"
    ></component>
  </ValidationObserver>
</template>
<script>
import { ValidationObserver } from "vee-validate";
export default {
  components: {
    ValidationObserver,
  },
  props: {
    field: Object,
    sectionSchema: Object,
  },
  mounted() {},
  methods: {
    onInput(value) {
      this.$store.commit("setFieldValue", {
        fieldId: this.field.id,
        value: value,
      });
      this.$emit("input", value);
    },
  },
};
</script>
<style scoped>
.mt-2 {
  margin-top: 1.75rem;
}
</style>
<style>
.is-invalid {
  position: relative;
  top: -5px;
  color: #f44336;
  font-size: 12px;
}
</style>
