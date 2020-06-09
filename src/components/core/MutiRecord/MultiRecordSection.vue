<template>
  <div class="row" v-if="sectionSchema">
    <CommonInput
      v-for="field in sectionSchema.fields"
      :key="field.id"
      :field="field"
      :sectionSchema="sectionSchema"
      @input="onInput(field.id, $event)"
    />
  </div>
</template>
<script>
import CommonInput from "../CommonInput";

export default {
  props: {
    index: Number,
    section: Object,
  },
  components: {
    CommonInput,
  },
  data() {
    return {
      formData: {},
      sectionSchema: null,
    };
  },
  mounted() {
    this.getSectionDataByIndex();
  },
  methods: {
    getSectionDataByIndex() {
      this.formData = this.$store.state.resume[this.section.id][this.index];
      this.sectionSchema = JSON.parse(JSON.stringify(this.section)); //Deep clone
      this.sectionSchema.fields = this.sectionSchema.fields.filter(
        (f) => f.type !== "form-action"
      );
      this.sectionSchema.fields.forEach((f) => {
        f.value = this.formData[f.id];
        f.visible = true;
      });
    },
    onInput(fieldId, value) {
      if (this.formData[fieldId] != value) {
        this.$store.commit("updateMultiRecord", {
          sectionSchema: this.section,
          value: value,
          fieldId: fieldId,
          index: this.index,
        });
        this.$emit("input");
      }
    },
  },
};
</script>
<style scoped></style>
