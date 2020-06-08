<template>
  <validation-provider
    :immediate="validateOnLoad"
    :class="`input-field col s12 ${field.col} ${field.class}`"
    :rules="field.validations"
    tag="div"
  >
    <template slot-scope="{ errors }">
      <input
        type="text"
        :id="field.id"
        :class="{
          'is-invalid invalid mt-1': errors.length > 0,
        }"
        :placeholder="field.placeholder"
        @input="$emit('input', value)"
        v-model="value"
      />
      <label :for="field.id" :class="{ active: value }">
        {{ field.label }}</label
      >
      <span v-show="errors.length > 0" class="is-invalid right">{{
        errors[0]
      }}</span>
    </template>
  </validation-provider>
</template>
<script>
import { ValidationProvider } from "vee-validate";
export default {
  props: {
    field: Object,
    sectionSchema: Object,
  },
  components: {
    ValidationProvider,
  },
  computed: {
    validateOnLoad() {
      return this.$store.state.resume.id !== undefined;
    },
  },
  data() {
    return {
      value: this.field.value,
    };
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
