<template>
  <component
    :is="field.type"
    :field="field"
    :sectionSchema="sectionSchema"
    @input="onInput($event)"
  ></component>
</template>
<script>
export default {
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
