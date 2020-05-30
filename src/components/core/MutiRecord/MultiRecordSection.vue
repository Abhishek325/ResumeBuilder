<template>
  <div>
    <div class="row" v-if="sectionSchema">
      <CommonInput
        v-for="field in sectionSchema.fields"
        :key="field.id"
        :field="field"
        :sectionSchema="sectionSchema"
        @input="onInput(field.id, $event)"
      />
    </div>
  </div>
</template>
<script>
import FormSchema from "../../../model/formSchema.json";
import CommonInput from "../CommonInput";

export default {
  props: {
    index: Number,
    sectionName: String,
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
    this.sectionSchema = Object.assign(
      {},
      FormSchema.sections.find((s) => s.name === this.sectionName)
    );
    this.sectionSchema.fields = this.sectionSchema.fields.filter(
      (f) => f.type !== "form-action"
    );
    this.getSectionDataByIndex();
  },
  methods: {
    getSectionDataByIndex() {
      switch (this.sectionName.toLowerCase()) {
        case "employment history":
          this.formData = this.$store.state.employment_history[this.index];
          break;
        case "education":
          this.formData = this.$store.state.education[this.index];
          break;
        case "website and social links":
          this.formData = this.$store.state.links[this.index];
          break;
        case "skills":
          this.formData = this.$store.state.skills[this.index];
          break;
      }
      this.sectionSchema.fields.forEach((f) => {
        f.value = this.formData[f.id];
      });
    },
    onInput(fieldId, value) {
      if (this.formData[fieldId] != value) {
        this.$store.commit("updateMultiRecord", {
          type: this.sectionName.toLowerCase(),
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
