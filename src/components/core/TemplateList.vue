<template>
  <div class="row">
    <div class="col m4" v-for="(template, index) in templateList" :key="index">
      <img
        class="z-depth-3"
        :class="{ selected: selected == template.component }"
        :src="`img/templates/${template.imagePath}`"
        style="width:100%"
        @click="selectTemplate(template)"
      />
      <div class="center-align col m12" v-if="selected == template.component">
        <i class="material-icons">check_circle</i>
      </div>
    </div>
  </div>
</template>
<script>
import TemplatesConfig from "../../model/templatesConfig.json";
export default {
  props: {
    formData: Object,
  },
  computed: {
    selected() {
      return this.$store.state.resume_template;
    },
  },
  data() {
    return {
      templateList: TemplatesConfig,
    };
  },
  methods: {
    selectTemplate(template) {
      this.$store.commit("setResumeTemplate", template.component);
      this.selected = template.component;
      this.$emit("selected", template.component);
    },
  },
};
</script>
<style scoped>
.row {
  height: 100vh;
  padding-top: 2.5rem;
  background: #7a8599;
}
img {
  height: 260px;
  cursor: pointer;
  border-radius: 5px;
  margin-bottom: 1.5rem;
}
.selected {
  border: 3px solid #0c99fdb5;
}
i {
  position: absolute;
  margin-top: -12rem;
  margin-left: -1rem;
  color: #0c99fdb5;
  font-size: 40px;
}
</style>
