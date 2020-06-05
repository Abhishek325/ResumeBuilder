<template>
  <validation-provider
    :class="`input-field col s12 ${field.col} ${field.class}`"
    :rules="field.validations"
    :immediate="true"
    tag="div"
  >
    <template slot-scope="{ errors }">
      <input
        type="text"
        :id="field.id"
        :class="{
          'is-invalid invalid': errors.length > 0,
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
import { EventBus } from "../../../bus/eventBus";
import { ValidationProvider } from "vee-validate";
export default {
  props: {
    field: Object,
    sectionSchema: Object,
  },
  components: {
    ValidationProvider,
  },
  data() {
    return {
      value: this.field.value,
    };
  },
  mounted() {
    EventBus.$on("onMultiRecordAdded", (id) => {
      if (this.sectionSchema.id === id) this.value = "";
    });
  },
};
</script>
<style scoped>
.input-field {
  height: 54px;
}
</style>
